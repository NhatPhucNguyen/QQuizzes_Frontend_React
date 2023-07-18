import React from "react";
import { styled } from "styled-components";

type CustomProps = {
    backgroundColor: string;
    optionNumber: number;
};

const Container = styled.div<{ $backgroundColor: string }>`
    display: flex;
    width: 100%;
    background-color: ${(props) => props.$backgroundColor};
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem 1rem;
`;

const RadioButton = styled.input`
    width: 1rem;
`;
const OptionBox = styled.input`
    width: 100%;
    font-size: 1rem;
    background-color: inherit;
    padding: 0.5rem 1rem;
    color: #ffffff;
    border: none;
    outline: none;
    &::placeholder{
        color: #ffffff;
    }
`;
const OptionItem = (props: CustomProps) => {
    return (
        <Container $backgroundColor={props.backgroundColor}>
            <RadioButton
                type="radio"
                name="answer"
                value={props.optionNumber}
                aria-label="Check if this is true answer"
            />
            <OptionBox
                type="text"
                maxLength={100}
                placeholder="Type answer option here ..."
            />
        </Container>
    );
};

export default OptionItem;
