import { styled } from "styled-components";
import QuizCard from "../../components/QuizCard";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IQuiz } from "../../interfaces/app_interfaces";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Title = styled.h1`
    text-align: center;
`;
const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    justify-content: flex-start;
    flex: 1;
`;
const MyQuizzes = () => {
    const quizzesData = useLoaderData() as IQuiz[];
    return (
        <Container>
            <Title>Quizzes Management</Title>
            <CardsContainer>
                {quizzesData.map((quiz) => {
                    return <QuizCard key={quiz._id} quiz={quiz} />;
                })}
            </CardsContainer>
        </Container>
    );
};

export default MyQuizzes;
