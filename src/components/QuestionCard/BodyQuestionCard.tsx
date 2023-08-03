import React from "react";
import { styled } from "styled-components";
import { ISelection } from "../../interfaces/app_interfaces";

type CustomProps = {
    question?: string;
    selections?: ISelection[];
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
`;
const QuestionContainer = styled.div`
    width: 100%;
`;
const SelectionsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    border-top: 1px solid #bfbfbf;
    padding-top: 0.5rem;
`;
const SelectionItem = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
`;
const IconWrapper = styled.div``;
const Answer = styled.span``;
const Question = styled.p``;
const BodyQuestionCard = (props:CustomProps) => {
    return (
        <Container>
            <QuestionContainer>
                <Question>
                    loremasda asda da sdas d sad a sd sdas das ds
                </Question>
            </QuestionContainer>
            <SelectionsContainer>
                <SelectionItem>
                    <IconWrapper>X</IconWrapper>
                    <Answer>Aasdasdsad</Answer>
                </SelectionItem>
                <SelectionItem>
                    <IconWrapper>X</IconWrapper>
                    <Answer>Aasdasdsad</Answer>
                </SelectionItem>
                <SelectionItem>
                    <IconWrapper>X</IconWrapper>
                    <Answer>Aasdasdsad</Answer>
                </SelectionItem>
                <SelectionItem>
                    <IconWrapper>X</IconWrapper>
                    <Answer>Aasdasdsad</Answer>
                </SelectionItem>
            </SelectionsContainer>
        </Container>
    );
};

export default BodyQuestionCard;
