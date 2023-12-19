import {
    useLoaderData,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import { IQuestion } from "../../interfaces/app_interfaces";
import { questionsTotalCalculate } from "../../utils/questionsTotalCalculate";
import { devices } from "../../utils/devices";
import { customAxios } from "../../config/axiosConfig";
import { Result } from ".";
import { useEffect } from "react";

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
const Title = styled.h2`
    text-align: center;
`;
const ResultDetails = styled.div`
    width: 80%;
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 10%;
    align-items: center;
`;
const ResultField = styled.span`
    text-align: right;
    font-size: 1.2rem;
    width: 100%;
`;
const ResultStat = styled.span`
    text-align: left;
    font-size: 1.2rem;
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
    const questions = useLoaderData() as IQuestion[];
    const { result, totalTime } = usePlayBoardContext();
    const { totalPoints } = questionsTotalCalculate(questions);
    const { quizId } = useParams() as { quizId: string };
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const submitResult = async () => {
            try {
                await customAxios.patch(`/quizzes/${quizId}/play/result`, {
                    point: result.point,
                    timeCompleted: totalTime,
                    correctAnswers: result.correctAnswers,
                } as Result);
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
                <Title>Result</Title>
                <ResultDetails>
                    <ResultField>Point: </ResultField>
                    <ResultStat>{`${result.point}/${totalPoints}`}</ResultStat>
                </ResultDetails>
                <ResultDetails>
                    <ResultField>Correct Answers: </ResultField>
                    <ResultStat>{`${result.correctAnswers}/${questions.length}`}</ResultStat>
                </ResultDetails>
                <ResultDetails>
                    <ResultField>Total Time: </ResultField>
                    <ResultStat>
                        {totalTime > 60
                            ? `${Math.floor(totalTime / 60)}m${Math.floor(
                                  totalTime % 60
                              )}s`
                            : `${Math.ceil(totalTime)}s`}
                    </ResultStat>
                </ResultDetails>
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
                            if (searchParams.get("type") === "preview") {
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
