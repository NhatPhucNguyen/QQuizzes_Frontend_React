import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IQuiz } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import {
    createSearchParams,
    useParams,
    useSearchParams,
} from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import Filter from "../../components/Filter";

const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    margin-top: 3rem;
    height: 100%;
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    width: 100%;
    gap: 1rem;
    padding: 1rem;
`;
const QuizzesSearch = () => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const getAllQuizzes = async () => {
            try {
                const response = await customAxios.get(
                    `/quizzes/public/?${searchParams.toString()}`
                );
                setQuizzes(response.data as IQuiz[]);
            } catch (error) {
                console.log(error);
            }
        };
        void getAllQuizzes();
    }, [searchParams]);
    return (
        <Container>
            <LeftContainer>
                <Filter />
            </LeftContainer>
            <RightContainer>
                <ResultsContainer>
                    {quizzes &&
                        quizzes.map((quiz) => {
                            return <QuizCard key={quiz._id} quiz={quiz} />;
                        })}
                </ResultsContainer>
            </RightContainer>
        </Container>
    );
};

export default QuizzesSearch;
