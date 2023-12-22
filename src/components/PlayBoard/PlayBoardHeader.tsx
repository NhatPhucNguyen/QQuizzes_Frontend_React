import { useEffect } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import { keyframes, styled } from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { devices } from "../../config/devices";

const fadeDown = keyframes`
    from{
        opacity: 0;
    }
    to{       
        opacity: 1;
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    justify-content: center;
    align-items: center;
    @media screen and (${devices.phones}) {
        font-size: 3.5vw;
    }
`;
const RightHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 5rem;
    @media screen and (${devices.tablets}) {
        flex-direction: column;
        align-items: end;
        gap: 1rem;
    }
`;
const Detail = styled.h3``;
const Timer = styled.span`
    font-weight: bold;
`;
const QuestionNumber = styled.h2`
    text-align: center;
`;
const LeftHeader = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    @media screen and (${devices.tablets}) {
        display: block;
    }
`;
const Result = styled.span`
    font-weight: bold;
    font-size: 1.3em;
`;
const TotalPoint = styled.span`
    color: #04d704;
    animation: ${fadeDown} 0.8s linear;
`;
const PlayBoardHeader = () => {
    const { quiz, nextQuestion, isShowAns, getCurrentTime, question, result } =
        usePlayBoardContext();
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
            <LeftHeader>
                <CountdownCircleTimer
                    key={question.questionNumber}
                    isPlaying={!isShowAns}
                    duration={question.timeLimit}
                    colors={[
                        "#277C13",
                        "#93AB2C",
                        "#FFB306",
                        "#E87B00",
                        "#992E06",
                    ]}
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
                <Result>
                    Total:{" "}
                    <TotalPoint key={result.highestPoint}>
                        {result.highestPoint} pts
                    </TotalPoint>
                </Result>
            </LeftHeader>

            <QuestionNumber>Question {question.questionNumber}</QuestionNumber>
            <RightHeader>
                <Detail>{question.point} pts</Detail>
                <Detail>{question.questionNumber}/{quiz.quantity}</Detail>
            </RightHeader>
        </Container>
    );
};

export default PlayBoardHeader;
