import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import QuizCard from "../../components/QuizCard";
import { IQuiz } from "../../interfaces/app_interfaces";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    width: 100%;
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
