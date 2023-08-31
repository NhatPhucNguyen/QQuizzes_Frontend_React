import React from "react";
import Modal from "../../Layout/ModalLayout";
import { keyframes, styled } from "styled-components";
import { API } from "../../config/API";
import { customAxios } from "../../config/axiosConfig";
import {
    IQuestion,
    IQuiz,
    ModalCloseOptions,
} from "../../interfaces/app_interfaces";
import { useNavigate, useParams } from "react-router-dom";

const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-50px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    border: solid 5px #e7717d;
    border-radius: 15px;
    margin-bottom: auto;
    margin-top: 10rem;
    width: 40rem;
    animation: ${moveDown} 0.4s ease-in-out;
`;
const WarningMessage = styled.p``;
const KeyWord = styled.span`
    font-weight: bold;
    font-size: 1.1rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: end;
    margin-top: 1rem;
    gap: 1rem;
`;
const Button = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: inherit;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
const DeleteButton = styled(Button)`
    color: #ffffff;
    background-color: #f2421b;
    &:hover {
        background-color: #d5330e;
    }
`;
const CancelButton = styled(Button)`
    color: #ffffff;
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
type CustomProps = {
    question?: IQuestion;
    quiz?: IQuiz;
    closeModal: (options?: ModalCloseOptions) => void;
};
const Confirmation = ({ question, quiz, closeModal }: CustomProps) => {
    const navigate = useNavigate();
    const { quizId } = useParams();
    const deleteQuiz = async () => {
        try {
            const response = await customAxios.delete(
                API + `/api/quiz/delete/${quiz?._id as string}`
            );
            if (response.status === 200) {
                navigate("admin/quizzes");
                closeModal({
                    isDisplayNotification: true,
                    message: "Quiz was successfully deleted",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deleteQuestion = async () => {
        try {
            if (quizId) {
                const response = await customAxios.get(
                    `/api/quiz/${quizId}/delete/question/${
                        question?._id as string
                    }`
                );
                if (response.status === 200) {
                    navigate("questions");
                    closeModal({
                        isDisplayNotification: true,
                        message: `Question ${
                            question?.questionNumber as number
                        } was successfully deleted`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal>
            <Container>
                {quiz && (
                    <WarningMessage>
                        Are you sure to delete the{" "}
                        <KeyWord>{quiz?.quizName}</KeyWord> quiz ?
                    </WarningMessage>
                )}
                {question && (
                    <WarningMessage>
                        Are you sure to delete{" "}
                        <KeyWord>Question {question.questionNumber}</KeyWord> ?
                    </WarningMessage>
                )}
                <ButtonContainer>
                    <DeleteButton
                        onClick={() => {
                            if (quiz) {
                                void deleteQuiz();
                            }
                            if (question) {
                                void deleteQuestion();
                            }
                        }}
                    >
                        Delete
                    </DeleteButton>
                    <CancelButton
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Cancel
                    </CancelButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
};

export default Confirmation;
