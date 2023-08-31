import { useContext, useEffect } from "react";
import {
    CountdownCircleTimer,
    TimeProps
} from "react-countdown-circle-timer";
import { styled } from "styled-components";
import { PlayBoardContext } from "../../context/PlayBoardContext";

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

type CustomProps = {
    duration: number;
    point: number;
    questionNumber: number;
    questionsLength: number;
    getCurrentTime: (elapsedTime: number) => void;
};

const PlayBoardHeader = (props: CustomProps) => {
    const { nextQuestion, isShowAns } = useContext(PlayBoardContext);
    let currentTime: number;
    const renderTime = ({ remainingTime, elapsedTime }: TimeProps) => {
        currentTime = elapsedTime;
        return <Timer>{remainingTime}</Timer>;
    };
    useEffect(() => {
        if (isShowAns) {
            props.getCurrentTime(currentTime);
        }
    }, [isShowAns]);
    return (
        <Container>
            <CountdownCircleTimer
                key={props.questionNumber}
                isPlaying={!isShowAns}
                duration={props.duration}
                colors={["#277C13", "#93AB2C", "#FFB306", "#E87B00", "#992E06"]}
                colorsTime={[
                    props.duration,
                    props.duration / 1.5,
                    props.duration / 2,
                    props.duration / 3,
                    0,
                ]}
                size={80}
                onComplete={() => {
                    nextQuestion();
                }}
            >
                {renderTime}
            </CountdownCircleTimer>
            <QuestionNumber>Question {props.questionNumber}</QuestionNumber>
            <RightHeader>
                <Detail>{props.point} pts</Detail>
                <Detail>{props.questionNumber}/30</Detail>
            </RightHeader>
        </Container>
    );
};

export default PlayBoardHeader;
