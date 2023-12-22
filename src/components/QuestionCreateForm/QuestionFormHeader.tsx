import React from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "styled-components";
import { devices } from "../../config/devices";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    width: 100%;
`;
const QuestionNumber = styled.h1`
    font-weight: bold;
    @media screen and (${devices.phones}){
        font-size: 1.5rem;
    }
`;
const LimitRules = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 1rem;
    width: 50%;
    height: 80%;
`;
const RuleInput = styled.select`
    width: 8rem;
    background-color: #ffffff;
    font-size: 1rem;
    font-family: inherit;
    padding: 0.2rem 1rem;
    border: none;
    outline: none;
    @media screen and (${devices.phones}){
        width: 5rem;
        padding: 0.2rem;
        height: 2rem;
    }
`;

type CustomProps = {
    point?:number,
    timeLimit?:number
    questionNumber?:number
}

const QuestionFormHeader = (props:CustomProps) => {
    const { register } = useFormContext();
    const questionNumber = props.questionNumber || localStorage.getItem("nextQuestionNumber") as string;
    return (
        <Container>
            <QuestionNumber>{`Question ${questionNumber}`}</QuestionNumber>
            <LimitRules>
                <RuleInput defaultValue={props.point || 1} {...register("point")}>
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                    <option value={3}>3 points</option>
                </RuleInput>
                <RuleInput defaultValue={props.timeLimit || 30} {...register("timeLimit")}>
                    <option value={30}>30s</option>
                    <option value={45}>45s</option>
                    <option value={60}>60s</option>
                </RuleInput>
            </LimitRules>
        </Container>
    );
};

export default QuestionFormHeader;
