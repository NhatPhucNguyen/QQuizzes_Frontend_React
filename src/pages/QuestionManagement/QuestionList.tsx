import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import QuestionCard from "../../components/QuestionCard";
import QuestionListFunctions from "../../components/QuestionListFunctions";
import QuizInfoCard from "../../components/QuizInfoCard";
import { Question } from "../../interfaces/app_interfaces";
import { devices } from "../../config/devices";
import { useModalContext } from "../../context/ModalContext";
import Confirmation from "../../components/Confirmation";

const Container = styled.div`
    background-color: #ffffff;
    width: 100%;
`;
const SubContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% 40%;
    height: 100%;
    margin-top: 2rem;
    @media screen and (${devices.phones}), (${devices.tablets}) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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
    const questions = useLoaderData() as Question[];
    const {showModal} = useModalContext();
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
            {showModal.isShow && showModal.formName === "Confirmation" && (
                <Confirmation question={showModal.questionData} />
            )}
        </Container>
    );
};

export default QuestionList;
