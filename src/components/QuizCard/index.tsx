import React, { Fragment } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { IQuiz, ModalContext } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import { API } from "../../config/API";
import {
    faEye,
    faListCheck,
    faPen,
    faPlay,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { devices } from "../../utils/devices";
import { btnColorGenerate, levelColorText } from "../../utils/stylingMethod";

type CustomProps = {
    quiz: IQuiz;
    role?: string;
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

    @media screen and (${devices.phones}) {
        font-size: 1rem;
    }
`;

const Topic = styled.span`
    font-size: 1rem;
    text-align: center;
    @media screen and (${devices.phones}) {
        font-size: 0.8rem;
    }
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
const Quantity = styled.span`
    font-size: 0.8rem;
    @media screen and (${devices.phones}) {
        font-size: 0.6rem;
    }
`;
const Level = styled.span<{ $level?: string }>`
    font-size: 0.8rem;
    font-weight: bold;
    color: ${(props) => levelColorText(props.$level)};
    @media screen and (${devices.phones}) {
        font-size: 0.6rem;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 2.5rem;
    width: 100%;
    margin-top: 1rem;
`;

const Button = styled.button<{ $method?: string }>`
    padding: 0.2rem 1rem;
    font-size: inherit;
    font-family: inherit;
    border: none;
    background-color: inherit;
    color: ${(props) => btnColorGenerate(props.$method)};
    outline: 2px solid ${(props) => btnColorGenerate(props.$method)};
    &:hover {
        cursor: pointer;
        background-color: ${(props) => btnColorGenerate(props.$method)};
        color: #ffffff;
    }
    @media screen and (${devices.phones}) {
        font-size: 0.8rem;
        padding: 0.2rem;
    }
`;

const QuizCard = ({ quiz, role }: CustomProps) => {
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
                <Level $level={quiz.level}>{quiz.level || " "}</Level>
            </SubContainer>
            {role === "admin" ? (
                <ButtonContainer>
                    <Button
                        onClick={() => {
                            //navigate to list of questions
                            navigate(
                                `/admin/quizzes/${quiz._id as string}/questions`
                            );
                        }}
                        $method="edit"
                    >
                        <FontAwesomeIcon icon={faPen} /> Edit
                    </Button>
                    <Button onClick={handleDeleteClick} $method="delete">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                </ButtonContainer>
            ) : (
                <ButtonContainer>
                    <Button
                        onClick={() => {
                            navigate(`/play/${quiz._id as string}`);
                        }}
                        $method="play"
                    >
                        <FontAwesomeIcon icon={faPlay} /> Play
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
};

export default QuizCard;
