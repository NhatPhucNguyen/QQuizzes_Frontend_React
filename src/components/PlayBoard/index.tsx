import { styled } from "styled-components";
import PlayBoardHeader from "./PlayBoardHeader";
import { useLoaderData } from "react-router-dom";
import { IQuestion, ShowModal } from "../../interfaces/app_interfaces";
import { useRef, useState } from "react";
import PlayBoardAnswers from "./PlayBoardAnswers";
import { PlayBoardContext } from "../../context/PlayBoardContext";
import Modal from "../../Layout/ModalLayout";
import ResultModal from "./ResultModal";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem;
    height: 100%;
`;
const QuestionContainer = styled.div`
    width: 80%;
    min-height: 10rem;
    height: 60%;
    font-size: 1.5rem;
    background-color: #7a4953;
    text-align: center;
    margin: 0 auto;
    color: #ffffff;
    padding: 2rem;
    display: flex;
    align-items: center;
`;
const Question = styled.p`
    width: 100%;
    word-wrap: break-word;
    text-align: center;
    overflow-y: auto;
`;
export type Result = {
    point: number;
    correctAnswers: number;
    totalTime: number;
};
const PlayBoard = () => {
    const questions = useLoaderData() as IQuestion[];
    const totalTime = useRef(0);
    const [index, setIndex] = useState(0);
    const [result, setResult] = useState({
        point: 0,
        correctAnswers: 0,
    } as Result);
    const [isShow, setIsShow] = useState(false); //showing the right and wrong answers
    const [showModal, setShowModal] = useState<ShowModal>();
    const getCurrentTime = (elapsedTime: number) => {
        totalTime.current += elapsedTime;
        console.log(totalTime.current);
    };
    const nextQuestion = (increasePoint?: boolean) => {
        setIsShow(true);
        if (increasePoint) {
            setResult((prevResult) => {
                return {
                    ...prevResult,
                    point: prevResult.point + 1,
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
            setTimeout(() => {
                setShowModal({ ...showModal, isShow: true });
            }, 1000);
        }
    };
    return (
        <PlayBoardContext.Provider
            value={{
                question: questions[index],
                nextQuestion: nextQuestion,
                isShowAns: isShow,
            }}
        >
            <Container>
                <PlayBoardHeader
                    duration={questions[index].timeLimit}
                    point={questions[index].point}
                    questionNumber={questions[index].questionNumber as number}
                    questionsLength={questions.length}
                    getCurrentTime={getCurrentTime}
                />
                <QuestionContainer>
                    <Question>{questions[index].question}</Question>
                </QuestionContainer>
                <PlayBoardAnswers
                    key={questions[index].questionNumber}
                    selections={questions[index].selections}
                />
            </Container>
            {showModal?.isShow && (
                <ResultModal
                    questions={questions}
                    result={result}
                    totalTime={totalTime.current}
                />
            )}
        </PlayBoardContext.Provider>
    );
};

export default PlayBoard;
