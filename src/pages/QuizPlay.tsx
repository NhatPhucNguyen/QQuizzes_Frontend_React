import { useEffect, useState } from "react";
import { styled } from "styled-components";
import PlayBoard from "../components/PlayBoard";
import GuideBoard from "../components/GuideBoard";
import PlayBoardProvider from "../context/PlayBoardContext";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../config/axiosConfig";
import { socket } from "../services/socket";

const Container = styled.div`
    height: 100%;
    min-height: 100%;
`;
socket.connect();
const QuizPlay = () => {
    const [isShowGuide, setIsShowGuide] = useState(true);
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };
    const allowToPlay = () => {
        const playDataCreate = async () => {
            try {
                await customAxios.get<{isPreviewing:boolean}>(`/quizzes/${quizId}/play`);
                if(socket.connected){
                    setIsShowGuide(false);
                }
            } catch (error) {
                console.log(error);
                navigate(-1);
            }
        };
        void playDataCreate();
    };
    return (
        <PlayBoardProvider>
            <Container>
                {isShowGuide ? (
                    <GuideBoard allowedToPlay={allowToPlay} />
                ) : (
                    <PlayBoard />
                )}
            </Container>
        </PlayBoardProvider>
    );
};

export default QuizPlay;
