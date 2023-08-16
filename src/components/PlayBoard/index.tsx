import { styled } from "styled-components";
import PlayBoardHeader from "./PlayBoardHeader";
import { useLoaderData } from "react-router-dom";
import { IQuestion } from "../../interfaces/app_interfaces";
import { useState } from "react";
import PlayBoardAnswers from "./PlayBoardAnswers";
import { PlayBoardContext } from "../../context/PlayBoardContext";

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
    height: 12rem;
    font-size: 1.5rem;
    background-color: #7a4953;
    text-align: center;
    margin: 0 auto;
    color: #ffffff;
    padding: 2rem;
`;
const Question = styled.p`
    height: 100%;
    width: 100%;
    word-wrap: break-word;
    overflow-y: auto;
`;

const PlayBoard = () => {
    const questions = useLoaderData() as IQuestion[];
    const [index, setIndex] = useState(0);
    const [point, setPoint] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const nextQuestion = (increasePoint?: boolean) => {
        setIsShow(true);
        if (increasePoint) {
            setPoint((prevPoint) => prevPoint + questions[index].point);
        }
        if (index < questions.length - 1) {
            setTimeout(() => {
                setIndex((prevIndex) => prevIndex + 1);
                setIsShow(false);
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
                    currentPoint={point}
                />
                <QuestionContainer>
                    <Question>{questions[index].question}</Question>
                </QuestionContainer>
                <PlayBoardAnswers
                    key={questions[index].questionNumber}
                    selections={questions[index].selections}
                />
            </Container>
        </PlayBoardContext.Provider>
    );
};

export default PlayBoard;
