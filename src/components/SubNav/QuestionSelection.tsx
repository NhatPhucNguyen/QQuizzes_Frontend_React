import { styled } from "styled-components";
import { useFormContext } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { MultiChoiceContext } from "../../context/MultiChoiceContext";

export const QuestionNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const QuestionNumber = styled.select`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #ffffff;
    background-color: #844349;
    height: 100%;
    width: 50%;
    border: none;
    outline: none;
`;
const QuestionSelection = () => {
    const { register } = useFormContext();
    const { quizArr } = useContext(MultiChoiceContext);
    return (
        <QuestionNumberContainer>
            <QuestionNumber
                {...register("questionNumber")}
                defaultValue={quizArr.length + 1}
                autoFocus
            >
                <option value={quizArr.length + 1 | 1}>{`Question ${quizArr.length + 1}`}</option>
                {quizArr.length > 0 &&
                    quizArr.map((quiz) => {
                        return (
                            <option
                                key={quizArr.indexOf(quiz)}
                                value={quizArr.indexOf(quiz).toString()}
                            >{`Question ${quiz.questionNumber}`}</option>
                        );
                    })}
            </QuestionNumber>
        </QuestionNumberContainer>
    );
};

export default QuestionSelection;
