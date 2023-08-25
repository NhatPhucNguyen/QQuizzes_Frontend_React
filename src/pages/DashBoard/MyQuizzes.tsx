import { useLoaderData, useParams } from "react-router-dom";
import { styled } from "styled-components";
import QuizCard from "../../components/QuizCard";
import { IQuiz } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";

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
    display: grid;
    grid-template-columns: repeat(auto-fill, 15rem);
    gap: 1rem;
    padding: 1rem;
    @media screen and (${devices.phones}) {
        justify-content: center;
    }
`;
const MyQuizzes = () => {
    const quizzesData = useLoaderData() as IQuiz[];
    const { role } = useParams();
    return (
        <Container>
            <Title>
                {role === "admin"
                    ? "Manage Your Quizzes"
                    : "Explore All Quizzes"}
            </Title>
            <CardsContainer>
                {quizzesData.map((quiz) => {
                    return <QuizCard key={quiz._id} quiz={quiz} role={role} />;
                })}
            </CardsContainer>
        </Container>
    );
};

export default MyQuizzes;
