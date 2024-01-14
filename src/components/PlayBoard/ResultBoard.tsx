import {
    useLoaderData
} from "react-router-dom";
import styled from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { Question } from "../../interfaces/app_interfaces";
const Container = styled.div``;
const Title = styled.h2`
    text-align: center;
`;
const ResultDetails = styled.div`
    width: 100%;
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 10%;
    align-items: center;
`;
const ResultField = styled.span`
    text-align: right;
    width: 100%;
`;
const ResultStat = styled.span`
    text-align: left;
`;
const ResultBoard = () => {
    const { questions } = useLoaderData() as { questions: Question[] };
    const { result, totalTime, quiz } = usePlayBoardContext();
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
        </Container>
    );
};

export default ResultBoard;
