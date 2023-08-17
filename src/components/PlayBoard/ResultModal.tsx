import React from "react";
import { styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { IQuestion } from "../../interfaces/app_interfaces";
import { Result } from ".";
import { useNavigate, useParams } from "react-router-dom";

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
    padding: 1rem 2rem;
    border: none;
    background-color: #996e5c;
    font-size: inherit;
    font-weight: bold;
    color: #ffffff;
    &:hover{
        cursor: pointer;
        background-color: #825e4f;
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
    const {quizId} = useParams() as {quizId:string};
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
                <ResultDetails>
                    <ResultField>Attempts: </ResultField>
                    <ResultStat>1</ResultStat>
                </ResultDetails>
                <ButtonContainer>
                    <Button>Retry</Button>
                    <Button
                        onClick={() => {
                            navigate(`/admin/quizzes/${quizId}/questions`);
                        }}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </Container>
        </Modal>
    );
};

export default ResultModal;
