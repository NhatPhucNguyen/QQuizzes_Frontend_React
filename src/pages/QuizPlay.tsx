import { useState } from "react";
import { styled } from "styled-components";
import PlayBoard from "../components/PlayBoard";
import GuideBoard from "../components/GuideBoard";
import PlayBoardProvider from "../context/PlayBoardContext";

const Container = styled.div`
    height: 100%;
    overflow-y: hidden;
`;
const QuizPlay = () => {
    const [isShowGuide, setIsShowGuide] = useState(false);
    const allowToPlay = () => {
        setIsShowGuide(true);
    };
    return (
        <PlayBoardProvider>
            <Container>
                {isShowGuide ? (
                    <PlayBoard />
                ) : (
                    <GuideBoard allowedToPlay={allowToPlay} />
                )}
            </Container>
        </PlayBoardProvider>
    );
};

export default QuizPlay;
