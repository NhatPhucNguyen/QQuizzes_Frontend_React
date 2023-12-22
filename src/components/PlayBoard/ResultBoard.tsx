import React from "react";
import styled from "styled-components";
import {
    useNavigate,
    useLoaderData,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { IQuestion } from "../../interfaces/app_interfaces";
const Container = styled.div``;
const Title = styled.h2`
    text-align: center;
`;
const ResultDetails = styled.div`
    width: 80%;
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 10%;
    align-items: center;
`;
const ResultField = styled.span`
    text-align: right;
    font-size: 1.2rem;
    width: 100%;
`;
const ResultStat = styled.span`
    text-align: left;
    font-size: 1.2rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`;
const Button = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: inherit;
    font-weight: bold;
    color: #ffffff;
    &:hover {
        cursor: pointer;
    }
`;
const RetryButton = styled(Button)`
    background-color: #73a64e;
    &:hover {
        background-color: #558534;
    }
`;
const BackButton = styled(Button)`
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
const ResultBoard = () => {
    const navigate = useNavigate();
    const { questions } = useLoaderData() as { questions: IQuestion[] };
    const { result, totalTime, quiz } = usePlayBoardContext();
    const { quizId } = useParams() as { quizId: string };
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    return (
        <Container>
            <Title>Result</Title>
            <ResultDetails>
                <ResultField>Point: </ResultField>
                <ResultStat>{`${result.highestPoint}/${quiz.totalPoints}`}</ResultStat>
            </ResultDetails>
            <ResultDetails>
                <ResultField>Correct Answers: </ResultField>
                <ResultStat>{`${result.correctAnswers}/${questions.length}`}</ResultStat>
            </ResultDetails>
            <ResultDetails>
                <ResultField>Time Completed: </ResultField>
                <ResultStat>
                    {totalTime > 60
                        ? `${Math.floor(totalTime / 60)}m${Math.floor(
                              totalTime % 60
                          )}s`
                        : `${Math.ceil(totalTime)}s`}
                </ResultStat>
            </ResultDetails>
            <ButtonContainer>
                <RetryButton
                    onClick={() => {
                        navigate(0);
                    }}
                >
                    Retry
                </RetryButton>
                <BackButton
                    onClick={() => {
                        if (type === "preview") {
                            navigate(`/admin/quizzes/${quizId}/questions`);
                        } else {
                            navigate(`/dashboard/user/quizzes`);
                        }
                    }}
                >
                    Cancel
                </BackButton>
            </ButtonContainer>
        </Container>
    );
};

export default ResultBoard;
