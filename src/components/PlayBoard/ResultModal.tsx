import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
    background-color: #ffffff;
    border: solid 5px #e7717d;
    border-radius: 15px;
    animation: ${moveDown} 0.4s ease-in-out;
    padding: 0.5rem;
    @media screen and (${devices.phones}) {
        width: 90%;
    }
`;
const ResultContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`;
const Button = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: inherit;
    font-weight: bold;
    color: #ffffff;
    &:hover {
        cursor: pointer;
    }
`;
const RetryButton = styled(Button)`
    background-color: #73a64e;
    &:hover {
        background-color: #558534;
    }
`;
const BackButton = styled(Button)`
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
const ResultModal = () => {
    const navigate = useNavigate();
    const { result, totalTime } = usePlayBoardContext();
    const { quizId } = useParams() as { quizId: string };
    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
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
                <ResultContainer>
                    {/* Display result */}
                    <ResultBoard />
                    {showLeaderBoard ? <LeaderBoard /> : "Loading..."}
                </ResultContainer>
                <ButtonContainer>
                    <RetryButton
                        onClick={() => {
                            navigate(0);
                        }}
                    >
                        Retry
                    </RetryButton>
                    <BackButton
                        onClick={() => {
                            if (type === "preview") {
                                navigate(`/admin/quizzes/${quizId}/questions`);
                            } else {
                                navigate(`/dashboard/user/quizzes`);
                            }
                        }}
                    >
                        Cancel
                    </BackButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
};

export default ResultModal;
