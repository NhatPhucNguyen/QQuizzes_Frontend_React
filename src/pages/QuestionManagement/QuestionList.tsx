import React from "react";
import { styled } from "styled-components";
import QuestionListFunctions from "../../components/QuestionListFunctions";
import QuestionCard from "../../components/QuestionCard";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IQuestion, ModalContext } from "../../interfaces/app_interfaces";

const Container = styled.div`
    width: 70%;
    height: inherit;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    gap: 2rem;
`;
const SubContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 1rem;
`;
const QuestionCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;
const QuestionList = () => {
    const questions = useLoaderData() as IQuestion[];
    return (
        <Container>
            <QuestionListFunctions />
            <SubContainer>
                <QuestionCardsContainer>
                    {questions.map((question) => {
                        return <QuestionCard question={question} />;
                    })}
                </QuestionCardsContainer>
            </SubContainer>
        </Container>
    );
};

export default QuestionList;
