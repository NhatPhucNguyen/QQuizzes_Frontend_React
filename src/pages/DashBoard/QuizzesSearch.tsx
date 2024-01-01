import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Filter from "../../components/Filter";
import LoaderSpin from "../../components/LoaderSpin";
import QuizCard from "../../components/QuizCard";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { devices } from "../../config/devices";
import { getPublicQuizzes } from "../../apis/QuizAPI";

const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    margin-top: 3rem;
    height: 100%;
    @media screen and (${devices.tablets}) {
        display: block;
    }
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
const ResultHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 1rem;
    gap: 1rem;
`;
const Result = styled.div`
    background-color: #a8485c;
    color: #ffffff;
    width: fit-content;
    font-size: 1rem;
    border-radius: 15px;
    padding: 0.2rem 1rem;
`;
const SearchBar = styled.div`
    border-radius: 15px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: end;
`;
const SearchInput = styled.input`
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    border: none;
    font-size: inherit;
    outline: none;
    padding: 0.2rem 1rem;
    width: 70%;
`;
const SearchButton = styled.button`
    padding: 0.2rem 1rem;
    border: none;
    outline: none;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    color: #ffffff;
    background-color: #a8485c;
    font-size: inherit;
    &:hover {
        cursor: pointer;
        background-color: #893b4b;
    }
`;
const LoaderContainer = styled.div`
    width: 100%;
    margin-top: 2rem;
`;
const FilterButton = styled.button`
    margin-right: 1rem;
    padding: 0.2rem 1rem;
    border: none;
    outline: none;
    border-radius: 15px;
    color: #ffffff;
    background-color: #a8485c;
    &:hover {
        cursor: pointer;
        background-color: #893b4b;
    }
    display: none;
    @media screen and (${devices.tablets}) {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
        font-size: inherit;
    }
`;
const QuizzesSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilter, setShowFilter] = useState(false); //for responsive design
    const keyInputRef = useRef<HTMLInputElement>(null);
    const { data: quizzes, isLoading } = useQuery({
        queryFn: () => getPublicQuizzes(searchParams.toString()),
        queryKey: ["quizzes", searchParams.toString()],
    });
    const closeFilter = () => {
        setShowFilter(false);
    };
    return (
        <Container>
            <LeftContainer>
                <Filter showFilter={showFilter} closeFilter={closeFilter} />
            </LeftContainer>
            <RightContainer>
                <ResultHeader>
                    <Result>{quizzes?.length} results</Result>
                    <SearchBar>
                        <FilterButton
                            onClick={() => {
                                setShowFilter(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faFilter} /> Filter
                        </FilterButton>
                        <SearchInput
                            type="text"
                            defaultValue={searchParams.get("key") || ""}
                            ref={keyInputRef}
                        />
                        <SearchButton
                            onClick={() => {
                                setSearchParams((prev) => {
                                    prev.set(
                                        "key",
                                        keyInputRef.current
                                            ? keyInputRef.current.value
                                            : ""
                                    );
                                    return prev;
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </SearchButton>
                    </SearchBar>
                </ResultHeader>
                {isLoading ? (
                    <LoaderContainer>
                        <LoaderSpin $color="#a8485c" $size={3} $thickness={5} />
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
