import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { devices } from "../../config/devices";
import LeaderBoard from "../LeaderBoard";
import ResultBoard from "./ResultBoard";
import { useCallback, useEffect, useState } from "react";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { customAxios } from "../../config/axiosConfig";
import { IResult } from "../../interfaces/app_interfaces";
import { useNavigate, useParams } from "react-router-dom";

const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-30px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 1rem;
    background-color: #ffffff;
    border: solid 5px #e7717d;
    border-radius: 15px;
    animation: ${moveDown} 0.4s ease-in-out;
    width: 35rem;
    @media screen and (${devices.phones}) {
        width: 90%;
    }
`;
const ResultModal = () => {
    const { result, totalTime } = usePlayBoardContext();
    const { quizId } = useParams() as { quizId: string };
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("run me");
        const submitResult = async () => {
            try {
                await customAxios.put(`/quizzes/${quizId}/play/result`, {
                    highestPoint: result.highestPoint,
                    timeCompleted: totalTime,
                    correctAnswers: result.correctAnswers,
                } as IResult);
                setShowLeaderBoard(true);
            } catch (error) {
                console.log(error);
                navigate("/dashboard");
            }
        };
        void submitResult();
    }, []);
    return (
        <Modal>
            <Container>
                {/* Display result */}
                <ResultBoard />
                {showLeaderBoard ? (
                    <LeaderBoard style="Simple" />
                ) : (
                    "Loading..."
                )}
            </Container>
        </Modal>
    );
};

export default ResultModal;
