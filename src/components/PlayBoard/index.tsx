import { Fragment } from "react";
import { styled } from "styled-components";
import {
    usePlayBoardContext
} from "../../context/PlayBoardContext";
import PlayBoardAnswers from "./PlayBoardAnswers";
import PlayBoardHeader from "./PlayBoardHeader";
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
    timeCompleted: number;
    correctAnswers: number;
    questionsCompleted?: number;
};
const PlayBoard = () => {
    const { question, isShowModal } = usePlayBoardContext();
    return (
        <Fragment>
            <Container>
                <PlayBoardHeader />
                <QuestionContainer>
                    <Question>{question.question}</Question>
                </QuestionContainer>
                <PlayBoardAnswers key={question.questionNumber} />
            </Container>
            {isShowModal && <ResultModal />}
        </Fragment>
    );
};

export default PlayBoard;
