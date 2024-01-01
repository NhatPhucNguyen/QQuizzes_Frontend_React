/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
    IQuestion,
    IQuiz,
    IResult,
    ShowModal,
} from "../interfaces/app_interfaces";
import { createContext, useRef, useState, useContext, useEffect } from "react";
import { customAxios } from "../config/axiosConfig";

type PlayBoardValue = {
    question: IQuestion;
    nextQuestion: (increasePoint?: boolean) => void;
    isShowAns: boolean;
    isShowModal: boolean;
    totalTime: number;
    result: IResult;
    getCurrentTime: (elapsedTime: number) => void;
    quiz: IQuiz;
};

export const PlayBoardContext = createContext<PlayBoardValue | null>(null);

const PlayBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };
    const { questions } = useLoaderData() as { questions: IQuestion[] };
    const [quiz, setQuiz] = useState<IQuiz>({} as IQuiz);
    const [index, setIndex] = useState(0);
    const totalTime = useRef(0);
    const [result, setResult] = useState({
        highestPoint: 0,
        correctAnswers: 0,
    } as IResult);
    const [isShow, setIsShow] = useState(false); //showing the right and wrong answers
    const [showModal, setShowModal] = useState({} as ShowModal);
    const getCurrentTime = (elapsedTime: number) => {
        totalTime.current += elapsedTime;
    };
    const nextQuestion = (increasePoint?: boolean) => {
        setIsShow(true);
        //increase point when answer is true
        if (increasePoint) {
            setResult((prevResult) => {
                return {
                    ...prevResult,
                    highestPoint:
                        prevResult.highestPoint + questions[index].point,
                    correctAnswers: prevResult.correctAnswers + 1,
                };
            });
        }
        //submit result if index exceed number of questions
        if (index < questions.length - 1) {
            setTimeout(() => {
                setIndex((prevIndex) => prevIndex + 1);
                setIsShow(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setShowModal({ ...showModal, isShow: true });
            }, 1000);
        }
    };
    useEffect(() => {
        const getQuizData = async () => {
            console.log("get quiz data");
            try {
                const response = await customAxios(`/quizzes/${quizId}`);
                const data = response.data as IQuiz;
                setQuiz(data);
            } catch (error) {
                console.log(error);
                navigate("/dashboard");
            }
        };
        void getQuizData();
    }, []);
    return (
        <PlayBoardContext.Provider
            value={{
                question: questions[index],
                nextQuestion,
                isShowAns: isShow,
                isShowModal: showModal.isShow,
                totalTime: totalTime.current,
                result: result,
                getCurrentTime: getCurrentTime,
                quiz: quiz,
            }}
        >
            {children}
        </PlayBoardContext.Provider>
    );
};
export const usePlayBoardContext = () => {
    const context = useContext(PlayBoardContext);
    if (!context) {
        throw new Error(
            "usePlayBoardContext must be used within PlayBoardProvider"
        );
    }
    return context;
};
export default PlayBoardProvider;
