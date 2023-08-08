import React from "react";
import { styled } from "styled-components";
import { ISelection } from "../../interfaces/app_interfaces";
import {
    faCircleCheck,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CustomProps = {
    question: string;
    selections: ISelection[];
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
    grid-template-columns: 10% 90%;
    gap: 0.5rem;
`;
const IconWrapper = styled.div``;
const Answer = styled.span`
    word-wrap: break-word;
    overflow-y: auto;
`;
const Question = styled.p`
    word-wrap: break-word;
`;
const BodyQuestionCard = (props: CustomProps) => {
    return (
        <Container>
            <QuestionContainer>
                <Question>{props.question.slice(0, 50)}</Question>
            </QuestionContainer>
            <SelectionsContainer>
                {props.selections.map((selection, index) => {
                    return (
                        <SelectionItem key={index}>
                            <IconWrapper>
                                {selection.isTrue ? (
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        style={{ color: "#3ee401" }}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faSquareXmark}
                                        style={{ color: "#fb4141" }}
                                    />
                                )}
                            </IconWrapper>
                            <Answer>{selection.desc.slice(0, 20)}</Answer>
                        </SelectionItem>
                    );
                })}
            </SelectionsContainer>
        </Container>
    );
};

export default BodyQuestionCard;
