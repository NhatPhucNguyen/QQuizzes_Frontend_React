import React from "react";
import { styled } from "styled-components";
import OptionItem from "./OptionItem";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 80%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    padding: 1rem;
`;

const QuestionBox = styled.textarea`
    display: block;
    resize: none;
    width: 70%;
    border: none;
    outline: none;
    background-color: #f6f6f6;
    font-family: inherit;
    font-size: 1rem;
    text-align: center;
    padding: 3rem 0.5rem;
`;
const OptionsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 80%;
    gap: 1rem;
`;
const QuizCreateBoard = () => {
    return (
        <Container>
            <QuestionBox placeholder="Type your question..." rows={5} />
            <OptionsContainer>
                <OptionItem backgroundColor="green" optionNumber={1}/>
                <OptionItem backgroundColor="blue" optionNumber={2}/>
                <OptionItem backgroundColor="red" optionNumber={3}/>
                <OptionItem backgroundColor="purple" optionNumber={4}/>
            </OptionsContainer>
        </Container>
    );
};

export default QuizCreateBoard;
