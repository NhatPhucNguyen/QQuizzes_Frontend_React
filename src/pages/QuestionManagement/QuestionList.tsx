import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import QuestionCard from "../../components/QuestionCard";
import QuestionListFunctions from "../../components/QuestionListFunctions";
import { IQuestion } from "../../interfaces/app_interfaces";

const Container = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    gap: 2rem;
    padding: 1rem;
`;
const SubContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 1rem;
    height: 100%;
`;
const QuestionCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
            </SubContainer>
        </Container>
    );
};

export default QuestionList;
