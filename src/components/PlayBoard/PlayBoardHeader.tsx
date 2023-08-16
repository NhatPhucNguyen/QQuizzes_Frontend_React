import { TimeProps, CountdownCircleTimer } from "react-countdown-circle-timer";
import { styled } from "styled-components";
import { useContext } from 'react';
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
    currentPoint:number;
};

const PlayBoardHeader = (props: CustomProps) => {
    const {nextQuestion} = useContext(PlayBoardContext)
    const renderTime = ({ remainingTime }: TimeProps) => {
        return <Timer>{remainingTime}</Timer>;
    };
    return (
        <Container>
            <CountdownCircleTimer
                key={props.questionNumber}
                isPlaying
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
                <Detail>Total point : {props.currentPoint}</Detail>
            </RightHeader>
        </Container>
    );
};

export default PlayBoardHeader;
