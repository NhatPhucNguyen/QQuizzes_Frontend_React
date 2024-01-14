/* eslint-disable @typescript-eslint/no-misused-promises */
import { AxiosError } from "axios";
import { useState } from "react";
import {
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { createQuiz, updateQuiz } from "../../apis/QuizAPI";
import { devices } from "../../config/devices";
import { topicSelections } from "../../config/topicSelections";
import { Quiz, ModalCloseOptions } from "../../interfaces/app_interfaces";
import Alert from "../AuthForm/AlertBar";
import CloseMark from "../CloseMark";
import QuizFormController from "./QuizFormController";

type CustomProps = {
    selection?: string;
    title?: string;
    quizData?: Quiz;
    closeModal: (options?: ModalCloseOptions) => void;
    backToSelection?: () => void;
};

const Title = styled.h2`
    font-weight: bold;
    text-align: center;
`;

const moveLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(10px);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`;

const Container = styled.div`
    padding: 1rem 5rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    position: relative;
    border-radius: 25px;
    animation: ${moveLeft} 0.4s ease-in-out;
    @media screen and (${devices.phones}) {
        width: 90%;
        padding: 2rem 0;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    justify-content: center;
`;
const Button = styled.button`
    background-color: #8ac222;
    font-size: inherit;
    font-family: inherit;
    width: 8rem;
    padding: 0.5rem;
    border: none;
    border-radius: 50px;
    color: #ffffff;
    font-weight: bolder;
    &:hover {
        cursor: pointer;
        background-color: #7ba232;
    }
`;
const BackButton = styled(Button)`
    background-color: #f2b263;
    &:hover {
        background-color: #c3863b;
    }
`;
const QuizForm = (props: CustomProps) => {
    const methods = useForm<Quiz>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ isShow: false, message: "" });
    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<Quiz> = async (data, e) => {
        e?.preventDefault();
        const { name } = e?.target as HTMLFormElement;
        try {
            if (name === "create") {
                //create quiz
                const createdQuiz = await createQuiz(data);
                if (createdQuiz) {
                    navigate(`/admin/quizzes/${createdQuiz?._id}/questions`);
                }
            }
            if (name === "update" && props.quizData) {
                //update quiz
                await updateQuiz(
                    props.quizData._id,
                    data
                );
                navigate(`/admin/quizzes/${props.quizData._id}/questions`);
                props.closeModal({
                    isDisplayNotification: true,
                    message: "Quiz was successfully updated",
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const { message } = error.response?.data as { message: string };
                setAlert({
                    isShow: true,
                    message: message,
                });
            }
        }
    };
    const onInvalid: SubmitErrorHandler<Quiz> = (err, e) => {
        e?.preventDefault();
        if (err) {
            if (err.quizName?.type === "maxLength") {
                setAlert({
                    isShow: true,
                    message: "Quiz name must be less than 64 words",
                });
            } else {
                setAlert({ isShow: true, message: "Missing required fields" });
            }
        }
    };
    return (
        <Modal>
            <Container>
                <CloseMark closeModal={props.closeModal} />
                <FormProvider {...methods}>
                    <FormContainer
                        onSubmit={handleSubmit(onSubmit, onInvalid)}
                        name={props.quizData ? "update" : "create"}
                    >
                        <Title>{props.title}</Title>
                        {alert.isShow && <Alert message={alert.message} />}
                        <QuizFormController
                            type="text"
                            label="Quiz Name"
                            id="quizName"
                            defaultValue={props.quizData?.quizName}
                        />
                        <QuizFormController
                            type="select"
                            label="Topic"
                            id="topic"
                            defaultValue={
                                props.quizData?.topic || topicSelections.GK
                            }
                            selectOptions={Object.values(topicSelections)}
                        />
                        <QuizFormController
                            type="select"
                            label="Level"
                            id="level"
                            defaultValue={props.quizData?.level}
                            selectOptions={["Basic", "Medium", "Hard"]}
                        />
                        <ButtonContainer>
                            <Button type="submit">
                                {props.quizData ? "Update" : "Create"}
                            </Button>
                            {props.backToSelection && (
                                <BackButton
                                    type="button"
                                    onClick={props.backToSelection}
                                >
                                    Back
                                </BackButton>
                            )}
                        </ButtonContainer>
                    </FormContainer>
                </FormProvider>
            </Container>
        </Modal>
    );
};

export default QuizForm;
