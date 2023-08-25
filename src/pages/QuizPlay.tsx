import { useState } from "react";
import { styled } from "styled-components";
import PlayBoard from "../components/PlayBoard";
import GuideBoard from "../components/GuideBoard";

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
        <Container>{isShowGuide ? <PlayBoard /> : <GuideBoard allowedToPlay={allowToPlay}/>}</Container>
    );
};

export default QuizPlay;
