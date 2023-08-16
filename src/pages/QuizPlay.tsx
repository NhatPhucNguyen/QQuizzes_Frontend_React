import React from "react";
import { styled } from "styled-components";
import PlayBoard from "../components/PlayBoard";

const Container = styled.div`
    height: 100%;
    overflow-y: hidden;
`;

const QuizPlay = () => {
    return (
        <Container>
            <PlayBoard />
        </Container>
    );
};

export default QuizPlay;
