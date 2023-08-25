import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { customAxios } from "../../config/axiosConfig";
import { IQuestion, ModalContext } from "../../interfaces/app_interfaces";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 0.5rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
const Button = styled.button`
    padding: 0.5rem 1.5rem;
    border: 2px solid #a1acb3;
    background-color: #ffffff;
    &:hover {
        cursor: pointer;
        background-color: #e6e6e6;
    }
`;
const FooterQuestionCard = ({ questionData }: { questionData: IQuestion }) => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const outletContext = useOutletContext<ModalContext>();
    const deleteQuestion = async () => {
        try {
            if (quizId) {
                const response = await customAxios.get(
                    `/api/quiz/${quizId}/delete/question/${
                        questionData._id as string
                    }`
                );
                if (response.status === 200) {
                    navigate(0);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        outletContext.openModal({ question: questionData });
                    }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {
                        void deleteQuestion();
                    }}
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default FooterQuestionCard;
