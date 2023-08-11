import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { IQuiz, ModalContext } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import { API } from "../../config/API";
import {
    faEye,
    faListCheck,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { devices } from "../../utils/devices";

type CustomProps = {
    quiz: IQuiz;
};

const Container = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10rem;
    gap: 0.5rem;
`;
const QuizName = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
`;

const Topic = styled.span`
    font-size: 1rem;
    text-align: center;
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
const Quantity = styled.span`
    font-size: 0.8rem;
`;
const Level = styled.span`
    font-size: 0.8rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.5rem;
    width: 100%;
`;
const Button = styled.button`
    padding: 0.2rem;
    background-color: inherit;
    border: none;
    outline: none;
    &:hover {
        cursor: pointer;
        color: #86a69d;
    }
`;

const QuizCard = ({ quiz }: CustomProps) => {
    const outletContext = useOutletContext<ModalContext>();
    const navigate = useNavigate();
    const handleDeleteClick = () => {
        const deleteQuiz = async () => {
            try {
                console.log(quiz.quizName);
                const response = await customAxios.delete(
                    API + `/api/quiz/delete/${quiz.quizName}`
                );
                if (response.status === 200) {
                    navigate(0);
                }
            } catch (error) {
                console.log(error);
            }
        };
        void deleteQuiz();
    };
    return (
        <Container>
            <QuizName>{quiz.quizName || " "}</QuizName>
            <Topic>{quiz.topic || " "}</Topic>
            <SubContainer>
                <Quantity>
                    {quiz.quantity
                        ? `${quiz.quantity} questions`
                        : `0 questions`}{" "}
                </Quantity>
                <Level>{quiz.level || " "}</Level>
            </SubContainer>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        //navigate to list of questions
                        navigate(
                            `/admin/quizzes/${quiz._id as string}/questions`
                        );
                    }}
                >
                    {/* View */}
                    <FontAwesomeIcon icon={faEye} size="xl" />
                </Button>
                <Button
                    onClick={() => {
                        outletContext.openModal("QuizForm", quiz);
                    }}
                >
                    {/* Update */}
                    <FontAwesomeIcon icon={faPen} size="xl" />
                </Button>
                <Button onClick={handleDeleteClick}>
                    {/* Delete */}
                    <FontAwesomeIcon icon={faTrash} size="xl" />
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default QuizCard;
