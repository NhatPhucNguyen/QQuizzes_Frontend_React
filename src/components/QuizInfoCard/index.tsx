import React from "react";
import {
    useLoaderData,
    useNavigate,
    useOutletContext,
    useParams,
    useRouteLoaderData,
} from "react-router-dom";
import { styled } from "styled-components";
import {
    IQuestion,
    IQuiz,
    ModalContext,
} from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import QuizDetailItem from "./QuizDetailItem";
import { questionsTotalCalculate } from "../../utils/questionsTotalCalculate";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    background-color: #f2b807;
    height: fit-content;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (${devices.phones}) {
        margin: auto;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
    gap: 1rem;
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    min-width: 5rem;
    background-color: #736002;
    border: none;
    color: #ffffff;
    font-weight: bold;
    &:hover {
        background-color: #8e7600;
        cursor: pointer;
    }
    &:disabled {
        background-color: #9b9b9b;
        cursor: default;
    }
`;
const QuizInfoCard = () => {
    const quiz = useRouteLoaderData("quiz") as IQuiz;
    const questions = useLoaderData() as IQuestion[];
    const { totalPoints, timeConverted } = questionsTotalCalculate(questions);
    const navigate = useNavigate();
    const outLetContext = useOutletContext<ModalContext>();
    return (
        <Container>
            <QuizDetailItem field="Topic" desc={quiz.topic} />
            <QuizDetailItem field="Type" desc="Multiple Choice"/>
            <QuizDetailItem
                field="Level"
                desc={quiz.level}
                level={quiz.level}
            />
            <QuizDetailItem field="Quantity" desc={`${questions.length}/30`} />
            <QuizDetailItem field="Total point" desc={`${totalPoints} pts`} />
            <QuizDetailItem field="Time limit" desc={timeConverted} />
            <ButtonContainer>
                <Button
                    onClick={() => {
                        navigate(`/play/${quiz._id as string}?type=preview`);
                    }}
                    // at least 10 questions to play
                    disabled={questions.length >= 10 ? false : true}
                >
                    Preview
                </Button>
                <Button
                    onClick={() => {
                        outLetContext.openModal({
                            formName: "QuizForm",
                            quizData: quiz,
                        });
                    }}
                >
                    Edit
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default QuizInfoCard;
