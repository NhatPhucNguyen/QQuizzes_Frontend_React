/* eslint-disable @typescript-eslint/no-misused-promises */
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useState } from "react";
import {
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { customAxios } from "../../config/axiosConfig";
import {
    IAlert,
    IQuestion,
    ISelection,
    ModalCloseOptions,
} from "../../interfaces/app_interfaces";
import { devices } from "../../config/devices";
import Alert from "../AuthForm/Alert";
import AnswersGroup from "./AnswersGroup";
import QuestionFormHeader from "./QuestionFormHeader";
import Modal from "../../Layout/ModalLayout";
import { keyframes } from "styled-components";

type CustomProps = {
    closeModal: (options?: ModalCloseOptions) => void;
    quizId: string;
    questionData?: IQuestion;
};

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

const BigWrapper = styled.div`
    width: 80%;
    background-color: #222831;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${moveDown} 0.4s ease-in-out;
    @media screen and (${devices.phones}) {
        width: 100%;
        height: 100%;
    }
`;

const FormContainer = styled.form`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    color: #eeeeee;
    @media screen and (${devices.phones}) {
        width: 100%;
    }
`;
const QuestionInput = styled.textarea`
    width: 100%;
    padding: 2rem 4rem 1rem 4rem;
    resize: none;
    border: 1px solid black;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    background-color: #393e46;
    color: #eeeeee;
    border: 1px solid #eeeeee;
    transition: 0.4s all ease-in-out;
    &::placeholder {
        color: #949ba6;
    }
    &:focus {
        border: 1px solid #00adb5;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    padding: 1rem;
    width: 80%;
    @media screen and (${devices.phones}) {
        width: 100%;
    }
`;
const Button = styled.button`
    width: 8rem;
    padding: 0.5rem 0;
    background-color: #f2f2f2;
    font-size: inherit;
    font-family: inherit;
    border: none;
    border-radius: 20px;
    outline: 2px solid #00adb5;
    outline-offset: -5px;
    transition: 0.2s all ease-in-out;
    &:hover {
        cursor: pointer;
        outline-offset: 2px;
    }
`;
const SaveButton = styled(Button)``;
const CancelButton = styled(Button)``;
type defaultValues = {
    question: string;
    trueIndexAns: number;
    answers: string[];
    point: number;
    timeLimit: number;
};
const QuestionCreateForm = (props: CustomProps) => {
    const methods = useForm<defaultValues>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [alert, setAlert] = useState<IAlert>({ isShow: false, message: "" });

    const onValid: SubmitErrorHandler<defaultValues> = (err, e) => {
        e?.preventDefault();

        if (err.question) {
            setAlert({ isShow: true, message: "Please enter your question" });
        } else if (err.answers) {
            setAlert({ isShow: true, message: "Please enter your answer" });
        } else if (err.trueIndexAns) {
            setAlert({
                isShow: true,
                message: "Please select one true answer",
            });
        }
    };

    const createQuestion = async (newQuestion: IQuestion) => {
        const response = await customAxios.post(
            `/quizzes/${props.quizId}/questions`,
            JSON.stringify(newQuestion)
        );
        if (response.status === 200) {
            navigate("questions");
            props.closeModal({
                isDisplayNotification: true,
                message: `Question ${
                    localStorage.getItem("nextQuestionNumber") as string
                } was successfully added`,
            });
        }
    };

    const updateQuestion = async (updatedQuestion: IQuestion) => {
        if (props.questionData?._id) {
            const response = await customAxios.put(
                `/quizzes/${props.quizId}/questions/${props.questionData._id}`,
                JSON.stringify(updatedQuestion)
            );
            if (response.status === 200) {
                navigate("questions");
                props.closeModal({
                    isDisplayNotification: true,
                    message: `Question ${
                        props.questionData.questionNumber as number
                    } was successfully updated`,
                });
            }
        }
    };
    const onSubmit: SubmitHandler<defaultValues> = async (data, e) => {
        e?.preventDefault();
        //get form name for request
        const { name } = e?.target as HTMLFormElement;
        //create an array of selection base on values of answer's input and radio button
        const selections = data.answers.map((answer, index) => {
            //use === because type of trueIndexAns is string due to react hook form default
            if (index == data.trueIndexAns) {
                const selection: ISelection = {
                    isTrue: true,
                    desc: answer,
                    selectionNumber: index,
                };
                return selection;
            } else {
                return {
                    desc: answer,
                    selectionNumber: index,
                };
            }
        }) as ISelection[];
        const newQuestion: IQuestion = {
            question: data.question,
            selections: selections,
            point: Number(data.point),
            timeLimit: Number(data.timeLimit),
        };
        try {
            if (name === "create") {
                await createQuestion(newQuestion);
            }
            if (name === "update" && props.questionData?._id) {
                await updateQuestion(newQuestion);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    const { message } = error.response.data as {
                        message: string;
                    };
                    setAlert({
                        ...alert,
                        isShow: true,
                        message: message,
                    });
                }
            }
        }
    };
    return (
        <Modal>
            <FormProvider {...methods}>
                <BigWrapper>
                    <FormContainer
                        onSubmit={handleSubmit(onSubmit, onValid)}
                        name={props.questionData ? "update" : "create"}
                    >
                        <QuestionFormHeader
                            questionNumber={props.questionData?.questionNumber}
                            point={props.questionData?.point}
                            timeLimit={props.questionData?.timeLimit}
                        />
                        {alert.isShow && <Alert message={alert.message} />}
                        <QuestionInput
                            rows={5}
                            placeholder="Please enter a question..."
                            autoFocus={true}
                            maxLength={500}
                            defaultValue={props.questionData?.question}
                            {...methods.register("question", {
                                required: "Please enter your question",
                            })}
                        />
                        <AnswersGroup
                            selections={props.questionData?.selections}
                        />
                        <ButtonContainer>
                            <SaveButton type="submit">
                                <FontAwesomeIcon icon={faFloppyDisk} /> Save
                            </SaveButton>
                            <CancelButton
                                type="button"
                                onClick={() => {
                                    props.closeModal();
                                }}
                            >
                                <FontAwesomeIcon icon={faBan} /> Cancel
                            </CancelButton>
                        </ButtonContainer>
                    </FormContainer>
                </BigWrapper>
            </FormProvider>
        </Modal>
    );
};

export default QuestionCreateForm;
