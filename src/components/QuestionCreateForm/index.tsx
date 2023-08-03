import React from "react";
import { styled } from "styled-components";
import SelectionItem from "./SelectionItem";
import AnswersGroup from "./AnswersGroup";

const Container = styled.form`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #222831;
    gap: 2rem;
    padding: 0.5rem;
    color: #eeeeee;
`;
const QuestionNumber = styled.span``;
const QuestionInput = styled.textarea`
    width: 70%;
    padding: 2rem 4rem 1rem 4rem;
    resize: none;
    border: 1px solid black;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    background-color: #393e46;
    color: #eeeeee;
    border: 1px solid #eeeeee;
    transition: 0.4s all ease-in-out;
    &::placeholder {
        color: #949ba6;
    }
    &:focus {
        border: 1px solid #00adb5;
        transition: 0.4s all ease-in-out;
    }
`;
const QuestionCreateForm = () => {
    return (
        <Container>
            <QuestionNumber>Question Number</QuestionNumber>
            <QuestionInput
                rows={5}
                placeholder="Please enter a question..."
                autoFocus={true}
            />
            <AnswersGroup />
        </Container>
    );
};

export default QuestionCreateForm;
