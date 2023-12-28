import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import QuizzesOnTopic from "../../components/QuizzesOnTopic";
import { customAxios } from "../../config/axiosConfig";
import { devices } from "../../config/devices";
import { topicSelections } from "../../config/topicSelections";
import { IQuiz } from "../../interfaces/app_interfaces";

const Container = styled.div`
    font-weight: bold;
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const Title = styled.h1`
    font-size: 5vw;
    font-family: "Lumanosimo", cursive;
    color: #86a69d;
    text-align: center;
    margin: 1.5rem 0;
`;
const SearchBoxContainer = styled.form`
    width: 80%;
    border-radius: 50px;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 30% 55% 15%;
    justify-content: flex-end;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin: auto;
    @media screen and (${devices.phones}) {
        width: 100%;
    }
`;

const SearchBox = styled.input`
    width: 100%;
    font-size: 24px;
    padding: 0.8rem 0rem;
    border: none;
    outline: none;
    @media screen and (${devices.phones}) {
        font-size: 1rem;
        &::placeholder {
            font-size: 0.8rem;
        }
    }
`;
const SearchButton = styled.button`
    border: none;
    outline: none;
    border-radius: 0 50px 50px 0;
    width: 100%;
    font-size: 1rem;
    background-color: #bf7e78;
    color: #f2e4dc;
    &:hover {
        cursor: pointer;
        background-color: #a06762;
    }
`;
const TopicSelected = styled.div`
    font-size: 0.9rem;
    background-color: #b041af;
    margin: 0.5rem auto;
    border-radius: 0;
    width: 60%;
    padding: 0;
    color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;
const TopicList = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1rem;
    margin: auto;
    margin-top: 2rem;
`;
const Topic = styled.button`
    flex: 0 0 fit-content;
    text-align: center;
    border: 1px solid #a8485c;
    padding: 0.5rem 0;
    color: #a8485c;
    background-color: inherit;
    outline: none;
    font-weight: bold;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        background-color: #a8485c;
        color: #ffffff;
    }
`;
const QuizzesContainer = styled.div``;
const InitialContent = () => {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const [topicSelected, setTopicSelected] = useState<string>();
    const [quizzes, setQuizzes] = useState<IQuiz[]>();
    useEffect(() => {
        const getAllQuizzes = async () => {
            const response = await customAxios.get("/quizzes/public");
            setQuizzes(response.data as IQuiz[]);
        };
        void getAllQuizzes();
    }, []);
    const handleSearchClick = () => {
        const key = searchRef.current ? searchRef.current.value : "";
        if (!topicSelected) {
            navigate(`quizzes/?key=${key}`);
        } else {
            navigate(`quizzes/?key=${key}&topicName=${topicSelected}`);
        }
    };
    return (
        <Container>
            <Title>What are you looking for today ?</Title>
            <SearchBoxContainer
                onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    handleSearchClick();
                }}
            >
                <TopicSelected>{topicSelected || "All"}</TopicSelected>
                <SearchBox
                    type="text"
                    placeholder="Search for quizzes on any topic"
                    ref={searchRef}
                />
                <SearchButton type="button" onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </SearchButton>
            </SearchBoxContainer>
            <TopicList>
                <Topic
                    onClick={() => {
                        setTopicSelected("");
                    }}
                >
                    All
                </Topic>
                {Object.values(topicSelections).map((topic) => {
                    return (
                        <Topic
                            onClick={() => {
                                setTopicSelected(topic);
                            }}
                            key={topic}
                        >
                            {topic}
                        </Topic>
                    );
                })}
            </TopicList>
            {quizzes && (
                <QuizzesContainer>
                    {Object.values(topicSelections).map((topic, index) => {
                        return (
                            <QuizzesOnTopic
                                topicName={topic}
                                quizzes={quizzes || []}
                                key={index}
                            />
                        );
                    })}
                </QuizzesContainer>
            )}
        </Container>
    );
};

export default InitialContent;
