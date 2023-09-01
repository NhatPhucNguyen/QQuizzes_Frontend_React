/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IQuestion, ShowModal } from "../interfaces/app_interfaces";
import { createContext, useRef, useState, useContext } from "react";
import { Result } from "../components/PlayBoard";
import { customAxios } from "../config/axiosConfig";

type PlayBoardValue = {
    question: IQuestion;
    nextQuestion: (increasePoint?: boolean) => void;
    isShowAns: boolean;
    isShowModal: boolean;
    totalTime: number;
    result: Result;
    getCurrentTime: (elapsedTime: number) => void;
};

export const PlayBoardContext = createContext<PlayBoardValue | null>(null);

const PlayBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };
    const questions = useLoaderData() as IQuestion[];
    const [index, setIndex] = useState(0);
    const totalTime = useRef(0);
    const [result, setResult] = useState({
        point: 0,
        correctAnswers: 0,
    } as Result);
    const [isShow, setIsShow] = useState(false); //showing the right and wrong answers
    const [showModal, setShowModal] = useState({} as ShowModal);
    const getCurrentTime = (elapsedTime: number) => {
        totalTime.current += elapsedTime;
    };
    const nextQuestion = (increasePoint?: boolean) => {
        setIsShow(true);
        if (increasePoint) {
            setResult((prevResult) => {
                return {
                    ...prevResult,
                    point: prevResult.point + questions[index].point,
                    correctAnswers: prevResult.correctAnswers + 1,
                };
            });
        }
        if (index < questions.length - 1) {
            setTimeout(() => {
                setIndex((prevIndex) => prevIndex + 1);
                setIsShow(false);
            }, 1000);
        } else {
            const submitResult = async (timeCompleted: number) => {
                try {
                    await customAxios.patch(`/api/quiz/${quizId}/play/result`, {
                        point: result.point,
                        timeCompleted: timeCompleted,
                        correctAnswers: result.correctAnswers,
                    } as Result);
                } catch (error) {
                    console.log(error);
                    navigate("/dashboard");
                }
            };
            setTimeout(() => {
                void submitResult(totalTime.current);
                setShowModal({ ...showModal, isShow: true });
            }, 1000);
        }
    };
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
