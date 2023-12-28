import { Fragment, useEffect } from "react";
import { keyframes, styled } from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import PlayBoardAnswers from "./PlayBoardAnswers";
import PlayBoardHeader from "./PlayBoardHeader";
import ResultModal from "./ResultModal";
import { devices } from "../../config/devices";

const fadeLeftIn = keyframes`
    from{
        opacity: 0;
        transform: translateX(-20px);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem;
    height: 100%;
    @media screen and (${devices.tablets}) {
        padding: 1rem;
    }
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
    animation: ${fadeLeftIn} 0.4s ease-in-out;
    @media screen and (${devices.tablets}) {
        width: 100%;
    }
`;
const Question = styled.p`
    width: 100%;
    word-wrap: break-word;
    text-align: center;
    overflow-y: auto;
`;
const PlayBoard = () => {
    const { question, isShowModal } = usePlayBoardContext();
    return (
        <Fragment>
            <Container>
                <PlayBoardHeader />
                <Fragment key={question._id}>
                    <QuestionContainer>
                        <Question>{question.question}</Question>
                    </QuestionContainer>
                    <PlayBoardAnswers />
                </Fragment>
            </Container>
            {isShowModal && <ResultModal />}
        </Fragment>
    );
};

export default PlayBoard;
