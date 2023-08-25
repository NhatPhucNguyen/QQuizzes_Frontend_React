import React from "react";
import { styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { IQuestion } from "../../interfaces/app_interfaces";
import { Result } from ".";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Container = styled.div`
    width: 40%;
    padding: 1rem;
    background-color: #ffffff;
    outline: solid 5px #e7717d;
    border-radius: 15px;
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
`
const BackButton = styled(Button)`
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
type CustomProps = {
    questions: IQuestion[];
    result: Result;
    totalTime: number;
};

const ResultModal = (props: CustomProps) => {
    const totalPoint = props.questions.reduce(
        (x, question) => x + question.point,
        0
    );
    const navigate = useNavigate();
    const { quizId } = useParams() as { quizId: string };
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Modal>
            <Container>
                <Title>Result</Title>
                <ResultDetails>
                    <ResultField>Point: </ResultField>
                    <ResultStat>{`${props.result.point}/${totalPoint}`}</ResultStat>
                </ResultDetails>
                <ResultDetails>
                    <ResultField>Correct Answers: </ResultField>
                    <ResultStat>{`${props.result.point}/${props.questions.length}`}</ResultStat>
                </ResultDetails>
                <ResultDetails>
                    <ResultField>Total Time: </ResultField>
                    <ResultStat>
                        {props.totalTime > 60
                            ? `${Math.floor(props.totalTime / 60)}m${Math.floor(
                                  props.totalTime % 60
                              )}s`
                            : `${Math.ceil(props.totalTime)}s`}
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
