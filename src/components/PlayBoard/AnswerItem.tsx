import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { Selection } from "../../interfaces/app_interfaces";
import { socket } from "../../services/socket";

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
  questionId: string;
  selection: Selection;
};

type ReceivedData = {
  message: "true" | "false";
  selection: Selection;
};
const AnswerItem = (props: CustomProps) => {
  const { nextQuestion, isShowAns } = usePlayBoardContext();
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);
  useEffect(() => {
    if (isShowAns) {
      if (isCorrect) {
        setBackgroundColor("green");
      } else {
        if (isClicked) {
          setBackgroundColor("red");
        } else {
          setBackgroundColor("#848484");
        }
      }
    }
  }, [isClicked, isShowAns, isCorrect]);
  return (
    <Container
      type="button"
      $backgroundColor={backgroundColor}
      disabled={isShowAns || isClicked}
      onClick={() => {
        if(isClicked) return;
        setIsClicked(true);
        socket.emit("checking_answer", {
          questionId: props.questionId,
          selection: props.selection,
        });
        socket.once("receive_answer", (data: ReceivedData) => {
          if (
            data.message === "true" &&
            data.selection.desc === props.selection.desc
          ) {
            setIsCorrect(true);
            nextQuestion(true);
          } else {
            setIsCorrect(false);
            nextQuestion();
          }
        });
      }}
    >
      <Answer>{props.desc}</Answer>
    </Container>
  );
};

export default AnswerItem;
