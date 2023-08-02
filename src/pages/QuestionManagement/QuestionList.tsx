import React from "react";
import { styled } from "styled-components";
import QuestionListFunctions from "../../components/QuestionListFunctions";

const Container = styled.div`
    width: 70%;
    height: inherit;
    background-color: #ffffff;
`;
const QuestionList = () => {
    return (
        <Container>
            <QuestionListFunctions />
        </Container>
    );
};

export default QuestionList;
