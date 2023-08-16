import React from "react";
import { styled } from "styled-components";

const Container = styled.div<{$backgroundColor:string}>`
    width: 100%;
    height: 80%;
    background-color: ${props=>props.$backgroundColor};
    padding: 1rem;
    display: flex;
    align-items: center;
    color: #ffffff;
    &:hover{
        opacity: 0.9;
        cursor: pointer;
        outline: 2px solid #f9f240;
    }
`;
const Answer = styled.p`
    width: 100%;
    max-height: 100%;
    text-align: center;
    word-wrap: break-word;
    overflow-y: auto;
`;

type CustomProps = {
    backgroundColor:string
}

const AnswerItem = (props:CustomProps) => {
    return (
        <Container $backgroundColor={props.backgroundColor}>
            <Answer>
            The maid—she said she was dusting the cornersTh
            </Answer>
        </Container>
    );
};

export default AnswerItem;
