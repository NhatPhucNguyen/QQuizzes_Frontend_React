import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import { IQuestion, IQuiz } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";

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
        position: unset;
    }
`;
const QuizDetailItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    border-bottom: 1px dashed gray;
`;
const Field = styled.span`
    font-weight: bold;
`;
const Desc = styled.span<{ $level?: string }>`
    color: ${(props) => {
        if (props.$level === "Basic") {
            return "#0f821e";
        }
        if (props.$level === "Medium") {
            return "#5E19FF";
        }
        if (props.$level === "Hard") {
            return "#d03126";
        }
    }};
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
            <QuizDetailItem>
                <Field>Level:</Field>
                <Desc $level={quiz.level}>{quiz.level}</Desc>
            </QuizDetailItem>
            <QuizDetailItem>
                <Field>Quantity:</Field>
                <Desc>{questions.length}/30</Desc>
            </QuizDetailItem>
            <QuizDetailItem>
                <Field>Total Point:</Field>
                <Desc>{`${totalPoints} pts`}</Desc>
            </QuizDetailItem>
            <QuizDetailItem>
                <Field>Total Time:</Field>
                <Desc>
                    {totalTime > 60
                        ? `${Math.floor(totalTime / 60)}m${totalTime % 60}s`
                        : `${totalTime}s`}
                </Desc>
            </QuizDetailItem>
        </Container>
    );
};

export default QuizInfoCard;
