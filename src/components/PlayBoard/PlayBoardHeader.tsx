import { useEffect } from "react";
import {
    CountdownCircleTimer,
    TimeProps
} from "react-countdown-circle-timer";
import { styled } from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const RightHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 5rem;
`;
const Detail = styled.h3``;
const Timer = styled.span`
    font-weight: bold;
`;
const QuestionNumber = styled.h2`
    text-align: center;
`;

const PlayBoardHeader = () => {
    const { nextQuestion, isShowAns,getCurrentTime,question } = usePlayBoardContext();
    let currentTime: number;
    const renderTime = ({ remainingTime, elapsedTime }: TimeProps) => {
        currentTime = elapsedTime;
        return <Timer>{remainingTime}</Timer>;
    };
    useEffect(() => {
        if (isShowAns) {
            getCurrentTime(currentTime);
        }
    }, [isShowAns]);
    return (
        <Container>
            <CountdownCircleTimer
                key={question.questionNumber}
                isPlaying={!isShowAns}
                duration={question.timeLimit}
                colors={["#277C13", "#93AB2C", "#FFB306", "#E87B00", "#992E06"]}
                colorsTime={[
                    question.timeLimit,
                    question.timeLimit / 1.5,
                    question.timeLimit / 2,
                    question.timeLimit / 3,
                    0,
                ]}
                size={80}
                onComplete={() => {
                    nextQuestion();
                }}
            >
                {renderTime}
            </CountdownCircleTimer>
            <QuestionNumber>Question {question.questionNumber}</QuestionNumber>
            <RightHeader>
                <Detail>{question.point} pts</Detail>
                <Detail>{question.questionNumber}/30</Detail>
            </RightHeader>
        </Container>
    );
};

export default PlayBoardHeader;
