import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import { IQuestion, IQuiz } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import QuizDetailItem from "./QuizDetailItem";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    background-color: #f2b807;
    max-height: 10rem;
    position: sticky;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (${devices.phones}) {
        position: sticky;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    padding: 0.5rem;
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #736002;
    border: none;
    color: #ffffff;
    font-weight: bold;
    &:hover {
        background-color: #8e7600;
        cursor: pointer;
    }
`;
const QuizInfoCard = () => {
    const quiz = useRouteLoaderData("quiz") as IQuiz;
    const questions = useLoaderData() as IQuestion[];

    const totalPoints = questions.reduce(
        (x, question) => x + question.point,
        0
    );
    const totalTime = questions.reduce(
        (x, question) => x + question.timeLimit,
        0
    );
    return (
        <Container>
            <QuizDetailItem
                field="Level"
                desc={quiz.level}
                level={quiz.level}
            />
            <QuizDetailItem field="Quantity" desc={`${questions.length}/30`} />
            <QuizDetailItem field="Total Point" desc={`${totalPoints} pts`} />
            <QuizDetailItem
                field="Total Time"
                desc={
                    totalTime > 60
                        ? `${Math.floor(totalTime / 60)}m${totalTime % 60}s`
                        : `${totalTime}s`
                }
            />
            <ButtonContainer>
                <Button>Preview</Button>
                <Button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    Back to top
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default QuizInfoCard;
