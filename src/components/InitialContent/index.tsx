import React from "react";
import { styled } from "styled-components";
import SelectionBoard from "../SelectionBoard";
import { useOutletContext } from "react-router-dom";

type CustomProps = {
    isShowModal: boolean;
    closeModal: () => void;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    height: inherit;
    font-weight: bold;
    position: relative;
`;

const Title = styled.span`
    font-size: 3.5rem;
`;

const SearchBoxContainer = styled.form`
    width: 45rem;
    border-radius: 50px;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 80% 20%;
`;

const SearchBox = styled.input`
    width: 100%;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
`;
const SearchButton = styled.button`
    border: none;
    outline: none;
    border-radius: 0 50px 50px 0;
    width: 100%;
    font-size: 1rem;
`;
const JoinContainer = styled(SearchBoxContainer)`
    width: 30rem;
`;

const InitialContent = () => {
    const {isShowModal,closeModal} = useOutletContext<CustomProps>();
    return (
        <Container>
            <Title>What are you looking for today ?</Title>
            <SearchBoxContainer>
                <SearchBox
                    type="text"
                    placeholder="Search for quizzes on any topic"
                />
                <SearchButton>Search</SearchButton>
            </SearchBoxContainer>
            <Title>Or Join a game ?</Title>
            <JoinContainer>
                <SearchBox type="text" placeholder="Enter code" />
                <SearchButton>Join</SearchButton>
            </JoinContainer>
            {isShowModal && <SelectionBoard closeModal={closeModal}/>}
        </Container>
    );
};

export default InitialContent;
