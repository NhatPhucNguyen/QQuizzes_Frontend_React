import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    background-color: #a8404b;
`;
const CollectionName = styled.input`
    font-size: 1rem;
    padding: 1rem 0.5rem;
    background-color: #844349;
    border: none;
    outline: none;
    width: 50%;
    font-family: inherit;
    color: #ffffff;
    &::placeholder {
        color: #c9c9c9;
    }
`;
const QuestionNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const QuestionNumber = styled.select`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #ffffff;
    background-color: #844349;
    height: 100%;
    width: 50%;
    border: none;
    outline: none;
`;
const LimitContainer = styled(QuestionNumberContainer)`
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-end;
    padding-right: 0.2rem;
`;
const Point = styled(QuestionNumber)`
    width: 30%;
`;
const TimeLimit = styled(QuestionNumber)`
    width: 30%;
`;
const SubNav = () => {
    return (
        <Container>
            <CollectionName type="text" placeholder="Collection Name..." />
            <QuestionNumberContainer>
                <QuestionNumber defaultValue={"default"}>
                    <option value={"default"}>Question 1</option>
                    <option>Question 2</option>
                    <option>Question 3</option>
                </QuestionNumber>
            </QuestionNumberContainer>
            <LimitContainer>
                <Point>
                    <option value={"default"}>1 pts</option>
                    <option>2 pts</option>
                    <option>3 pts</option>
                </Point>
                <TimeLimit>
                    <option value={"default"}>30s</option>
                    <option>45s</option>
                    <option>60s</option>
                </TimeLimit>
            </LimitContainer>
        </Container>
    );
};

export default SubNav;
