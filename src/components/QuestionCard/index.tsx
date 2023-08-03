import React from "react";
import { styled } from "styled-components";
import BodyQuestionCard from "./BodyQuestionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { IQuestion, ISelection } from "../../interfaces/app_interfaces";

type CustomProps = {
    question: IQuestion;
};

const Container = styled.div`
    width: 90%;
    border-radius: 10px;
    border: 2px solid #a1acb3;
`;
const Head = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #e6e6e6;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0.5rem;
`;
const QuestionNumber = styled.span`
    padding: 0.5rem 0;
`;
const RuleContainer = styled.div`
    width: 40%;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: 1rem;
`;
const Point = styled.span`
    background-color: #bfbfbf;
    min-width: 4rem;
    text-align: center;
    padding: 0.5rem 0;
`;
const TimeLimit = styled.span`
    background-color: #bfbfbf;
    min-width: 4rem;
    text-align: center;
    padding: 0.5rem 0;
`;
const QuestionCard = (props:CustomProps) => {
    return (
        <Container>
            <Head>
                <QuestionNumber>Question Number</QuestionNumber>
                <RuleContainer>
                    <Point>
                        <FontAwesomeIcon
                            icon={faStar}
                            size="xs"
                            color="#ffffff"
                        />{" "}
                        1 pts
                    </Point>
                    <TimeLimit>
                        <FontAwesomeIcon
                            icon={faClock}
                            size="xs"
                            color="#ffffff"
                        />{" "}
                        30s
                    </TimeLimit>
                </RuleContainer>
            </Head>
            <BodyQuestionCard />
        </Container>
    );
};

export default QuestionCard;
