/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { styled } from "styled-components";
import SelectionItem from "./SelectionItem";
import AnswersGroup from "./AnswersGroup";
import CloseMark from "../CloseMark";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
    IQuestion,
    ISelection,
    ModalContext,
} from "../../interfaces/app_interfaces";
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { customAxios } from "../../config/axiosConfig";
import { API } from "../../config/API";

type CustomProps = {
    closeModal: () => void;
    quizId: string;
};

const Container = styled.form`
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #222831;
    gap: 2rem;
    padding: 0.5rem;
    color: #eeeeee;
`;
const QuestionNumber = styled.h2`
    font-weight: bold;
`;
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
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    padding: 1rem;
    width: 50%;
`;
const Button = styled.button`
    width: 8rem;
    padding: 0.5rem 0;
    background-color: #f2f2f2;
    font-size: inherit;
    font-family: inherit;
    border: none;
    border-radius: 20px;
    outline: 2px solid #00adb5;
    outline-offset: -5px;
    transition: 0.2s all ease-in-out;
    &:hover {
        cursor: pointer;
        outline-offset: 2px;
    }
`;
const SaveButton = styled(Button)``;
const ResetButton = styled(Button)``;
type defaultValues = {
    question: string;
    trueIndexAns: number;
    answers: string[];
};
const QuestionCreateForm = (props: CustomProps) => {
    const questionNumber = localStorage.getItem("nextQuestionNumber") as string;
    const methods = useForm<defaultValues>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<defaultValues> = async (data, e) => {
        e?.preventDefault();
        //create an array of selection base on values of answer's input and radio button
        const selections = data.answers.map((answer, index) => {
            //use === because type of trueIndexAns is string due to react hook form default
            console.log(index, data.trueIndexAns);
            if (index == data.trueIndexAns) {
                const selection: ISelection = {
                    isTrue: true,
                    desc: answer,
                    selectionNumber: index,
                };
                return selection;
            } else {
                return {
                    desc: answer,
                    selectionNumber: index,
                };
            }
        }) as ISelection[];
        const newQuestion: IQuestion = {
            question: data.question,
            selections: selections,
            point: 1,
            timeLimit: 30,
        };
        console.log(newQuestion, props.quizId);
        try {
            const response = await customAxios.post(
                `/api/quiz/${props.quizId}/question/create`,
                JSON.stringify(newQuestion)
            );
            if (response.status === 200) {
                navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <FormProvider {...methods}>
            <Container onSubmit={handleSubmit(onSubmit)}>
                <QuestionNumber>{"Question " + questionNumber}</QuestionNumber>
                <QuestionInput
                    rows={5}
                    placeholder="Please enter a question..."
                    autoFocus={true}
                    {...methods.register("question")}
                />
                <AnswersGroup />
                <ButtonContainer>
                    <SaveButton type="submit">
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save
                    </SaveButton>
                    <ResetButton
                        type="button"
                        onClick={() => {
                            props.closeModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faBan} /> Cancel
                    </ResetButton>
                </ButtonContainer>
            </Container>
        </FormProvider>
    );
};

export default QuestionCreateForm;
