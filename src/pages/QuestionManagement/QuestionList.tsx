import { useEffect } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import QuestionCard from "../../components/QuestionCard";
import QuestionListFunctions from "../../components/QuestionListFunctions";
import { IQuestion, IQuiz } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import QuizInfoCard from "../../components/QuizInfoCard";

const Container = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    gap: 2rem;
    padding: 1rem;
    @media screen and (${devices.phones}) {
        width: 100%;
    }
`;
const SubContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 1rem 0.2rem;
    height: 100%;
    @media screen and (${devices.phones}), (${devices.tablets}) {
        display: flex;
        flex-direction: column;
    }
`;
const QuestionCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    @media screen and (${devices.phones}), (${devices.tablets}) {
        order: 1;
    }
`;
const QuestionList = () => {
    const questions = useLoaderData() as IQuestion[];
    useEffect(() => {
        localStorage.setItem(
            "nextQuestionNumber",
            (questions.length + 1).toString()
        );
    }, [questions]);
    return (
        <Container>
            <QuestionListFunctions />
            <SubContainer>
                <QuestionCardsContainer>
                    {questions.map((question) => {
                        return (
                            <QuestionCard
                                key={question._id}
                                question={question}
                            />
                        );
                    })}
                </QuestionCardsContainer>
                <QuizInfoCard />
            </SubContainer>
        </Container>
    );
};

export default QuestionList;
