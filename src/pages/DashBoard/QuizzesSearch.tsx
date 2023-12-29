import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { QuizAPI } from "../../apis/QuizAPI";
import Filter from "../../components/Filter";
import LoaderSpin from "../../components/LoaderSpin";
import QuizCard from "../../components/QuizCard";

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
const ResultBar = styled.div`
    background-color: #a8485c;
    color: #ffffff;
    width: fit-content;
    margin-left: 1rem;
    padding: 0.2rem 1rem;
    font-size: 1rem;
    border-radius: 15px;
`;
const LoaderContainer = styled.div`
    width: 100%;
    margin-top: 2rem;
`;
const QuizzesSearch = () => {
    const [searchParams] = useSearchParams();
    const { data: quizzes, isLoading } = useQuery({
        queryFn: () => QuizAPI.getPublicQuizzes(searchParams.toString()),
        queryKey: ["quizzes", searchParams.toString()],
    });
    return (
        <Container>
            <LeftContainer>
                <Filter />
            </LeftContainer>

            <RightContainer>
                <ResultBar>{quizzes?.length} results</ResultBar>
                {isLoading ? (
                    <LoaderContainer>
                        <LoaderSpin $color="#a8485c" $size={3} $thickness={5}/>
                    </LoaderContainer>
                ) : (
                    <ResultsContainer>
                        {quizzes?.map((quiz) => {
                            return <QuizCard key={quiz._id} quiz={quiz} />;
                        })}
                    </ResultsContainer>
                )}
            </RightContainer>
        </Container>
    );
};

export default QuizzesSearch;
