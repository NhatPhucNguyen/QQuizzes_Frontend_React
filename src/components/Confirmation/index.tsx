import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../layout/ModalLayout";
import { deleteQuiz } from "../../apis/QuizAPI";
import { customAxios } from "../../config/axiosConfig";
import { devices } from "../../config/devices";
import { useModalContext } from "../../context/ModalContext";
import {
    Question,
    Quiz
} from "../../interfaces/app_interfaces";

const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-50px);
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
    margin-bottom: auto;
    margin-top: 10rem;
    width: 40rem;
    animation: ${moveDown} 0.4s ease-in-out;
    @media screen and (${devices.phones}), (${devices.tablets}) {
        width: 90%;
    }
`;
const WarningMessage = styled.p``;
const KeyWord = styled.span`
    font-weight: bold;
    font-size: 1.1rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: end;
    margin-top: 1rem;
    gap: 1rem;
`;
const Button = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: inherit;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
const DeleteButton = styled(Button)`
    color: #ffffff;
    background-color: #f2421b;
    &:hover {
        background-color: #d5330e;
    }
`;
const CancelButton = styled(Button)`
    color: #ffffff;
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
type CustomProps = {
    question?: Question;
    quiz?: Quiz;
};
const Confirmation = ({ question, quiz }: CustomProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { quizId } = useParams();
    const { closeModal } = useModalContext();
    const { mutateAsync: deleteQuizAsync } = useMutation({
        mutationFn: () => deleteQuiz(quiz?._id as string),
        mutationKey: ["myQuizzes"],
        onSuccess: () => {
            void queryClient.invalidateQueries(["myQuizzes"]);
            closeModal({
                isDisplayNotification: true,
                message: "Quiz was successfully deleted",
            });
        },
    });
    const deleteQuestion = async () => {
        try {
            if (quizId) {
                const response = await customAxios.delete(
                    `/quizzes/${quizId}/questions/${question?._id as string}`
                );
                if (response.status === 200) {
                    navigate(`/admin/quizzes/${quizId}/questions/`);
                    closeModal({
                        isDisplayNotification: true,
                        message: `Question ${
                            question?.questionNumber as number
                        } was successfully deleted`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal>
            <Container>
                {quiz && (
                    <WarningMessage>
                        Are you sure to delete the{" "}
                        <KeyWord>{quiz?.quizName}</KeyWord> quiz ?
                    </WarningMessage>
                )}
                {question && (
                    <WarningMessage>
                        Are you sure to delete{" "}
                        <KeyWord>Question {question.questionNumber}</KeyWord> ?
                    </WarningMessage>
                )}
                <ButtonContainer>
                    <DeleteButton
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={async () => {
                            if (quiz) {
                                await deleteQuizAsync();
                            }
                            if (question) {
                                void deleteQuestion();
                            }
                        }}
                    >
                        Delete
                    </DeleteButton>
                    <CancelButton
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Cancel
                    </CancelButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
};

export default Confirmation;
