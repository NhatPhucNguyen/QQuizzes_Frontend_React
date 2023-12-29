import {
    useLoaderData,
    useNavigate,
    useRouteLoaderData,
} from "react-router-dom";
import { styled } from "styled-components";
import { devices } from "../../config/devices";
import { useModalContext } from "../../context/ModalContext";
import { IQuestion, IQuiz } from "../../interfaces/app_interfaces";
import QuizDetailItem from "./QuizDetailItem";
import QuizForm from "../QuizForm";
import timeToString from "../../utils/timeToString";

const Container = styled.div`
    padding: 0.5rem;
    background-color: #f2b807;
    height: fit-content;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (${devices.tablets}) {
        margin: auto;
        width: 90%;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
    gap: 1rem;
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    min-width: 5rem;
    background-color: #736002;
    border: none;
    color: #ffffff;
    font-weight: bold;
    &:hover {
        background-color: #8e7600;
        cursor: pointer;
    }
    &:disabled {
        background-color: #9b9b9b;
        cursor: default;
    }
`;
const QuizInfoCard = () => {
    const quiz = useRouteLoaderData("quiz") as IQuiz;
    const questions = useLoaderData() as IQuestion[];
    const timeLimit = timeToString(quiz.timeLimit);
    const navigate = useNavigate();
    const { openModal, showModal, closeModal } = useModalContext();
    return (
        <Container>
            <QuizDetailItem field="Topic" desc={quiz.topic} />
            <QuizDetailItem field="Type" desc="Multiple Choice" />
            <QuizDetailItem
                field="Level"
                desc={quiz.level}
                level={quiz.level}
            />
            <QuizDetailItem field="Quantity" desc={`${quiz.quantity}/30`} />
            <QuizDetailItem
                field="Total point"
                desc={`${quiz.totalPoints} pts`}
            />
            <QuizDetailItem field="Time limit" desc={timeLimit} />
            <QuizDetailItem
                field="Number of plays"
                desc={`${quiz.numberOfPlays} plays`}
            />
            <ButtonContainer>
                <Button
                    onClick={() => {
                        navigate(`/play/${quiz._id as string}?type=preview`);
                    }}
                    // at least 10 questions to play
                    disabled={questions.length >= 10 ? false : true}
                >
                    Preview
                </Button>
                <Button
                    onClick={() => {
                        openModal({
                            quizData: quiz,
                            formName: "QuizForm",
                        });
                    }}
                >
                    Edit
                </Button>
            </ButtonContainer>
            {showModal.isShow && showModal.formName === "QuizForm" && (
                <QuizForm
                    closeModal={closeModal}
                    quizData={showModal.quizData}
                />
            )}
        </Container>
    );
};

export default QuizInfoCard;
