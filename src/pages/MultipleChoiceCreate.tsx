import React from "react";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import { styled } from "styled-components";
import QuizCreateBoard from "../components/QuizCreateBoard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: visible;
    height: max-content;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    padding: 1rem;
`;
const Button = styled.div`
    padding: 1rem;
    font-size: 1rem;
    background-color: #ffffff;
`;
const MultipleChoiceCreate = () => {
    return (
        <Container>
            <Navbar isHideButtons={true} />
            <SubNav />
            <MainContainer>
                <QuizCreateBoard />
                <Button>Next</Button>
            </MainContainer>
        </Container>
    );
};

export default MultipleChoiceCreate;
