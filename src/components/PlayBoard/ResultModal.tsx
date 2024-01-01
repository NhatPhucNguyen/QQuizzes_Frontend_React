import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { customAxios } from "../../config/axiosConfig";
import { devices } from "../../config/devices";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { IResult } from "../../interfaces/app_interfaces";
import LeaderBoard from "../LeaderBoard";
import ResultBoard from "./ResultBoard";

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
                    <LeaderBoard/>
                ) : (
                    "Loading..."
                )}
            </Container>
        </Modal>
    );
};

export default ResultModal;
