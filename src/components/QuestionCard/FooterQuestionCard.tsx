import React from "react";
import { styled } from "styled-components";
import { customAxios } from "../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

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
    padding: 0.5rem 2rem;
`;
const FooterQuestionCard = ({ questionId }: { questionId: string }) => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const deleteQuestion = async () => {
        try {
            if (quizId) {
                const response = await customAxios.get(
                    `/api/quiz/${quizId}/delete/question/${questionId}`
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
                <Button>Edit</Button>
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
