import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";

const Container = styled.button<{ $backgroundColor: string }>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.$backgroundColor};
    padding: 1rem;
    display: flex;
    align-items: center;
    color: #ffffff;
    border: none;
    font-size: inherit;
    &:hover {
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
    backgroundColor: string;
    desc: string;
    isTrue?: boolean;
};

const AnswerItem = (props: CustomProps) => {
    const { nextQuestion, isShowAns } = usePlayBoardContext();
    const [isClicked, setIsClicked] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(
        props.backgroundColor
    );
    useEffect(() => {
        if (isShowAns) {
            if (props.isTrue) {
                setBackgroundColor("green");
            } else {
                if (isClicked) {
                    setBackgroundColor("red");
                } else {
                    setBackgroundColor("#848484");
                }
            }
        }
    }, [isClicked, isShowAns, props.isTrue]);
    return (
        <Container
            type="button"
            $backgroundColor={backgroundColor}
            disabled={isShowAns}
            onClick={() => {                
                setIsClicked(true);
                if (props.isTrue) {
                    nextQuestion(true);
                } else {
                    nextQuestion();
                }
            }}
        >
            <Answer>{props.desc}</Answer>
        </Container>
    );
};

export default AnswerItem;
