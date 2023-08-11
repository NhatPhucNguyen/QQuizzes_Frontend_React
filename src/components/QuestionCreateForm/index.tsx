/* eslint-disable @typescript-eslint/no-misused-promises */
import { styled } from "styled-components";
import AnswersGroup from "./AnswersGroup";
import { useNavigate } from "react-router-dom";
import { IQuestion, ISelection } from "../../interfaces/app_interfaces";
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { customAxios } from "../../config/axiosConfig";
import QuestionFormHeader from "./QuestionFormHeader";
import { AxiosResponse } from "axios";
import { devices } from "../../utils/devices";

type CustomProps = {
    closeModal: () => void;
    quizId: string;
    questionData?: IQuestion;
};

const BigWrapper = styled.div`
    width: 80%;
    background-color: #222831;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (${devices.phones}){
        width: 100%;
    }
`;

const FormContainer = styled.form`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem;
    color: #eeeeee;
    @media screen and (${devices.phones}){
        width: 90%;
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
    @media screen and (${devices.phones}){
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
const ResetButton = styled(Button)``;
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
    const onSubmit: SubmitHandler<defaultValues> = async (data, e) => {
        e?.preventDefault();
        //get form name for request
        const { name } = e?.target as HTMLFormElement;
        //create an array of selection base on values of answer's input and radio button
        const selections = data.answers.map((answer, index) => {
            //use === because type of trueIndexAns is string due to react hook form default
            console.log(index, data.trueIndexAns);
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
                const response = await customAxios.post(
                    `/api/quiz/${props.quizId}/question/create`,
                    JSON.stringify(newQuestion)
                );
                if (response.status === 200) {
                    navigate(0);
                }
            }
            if (name === "update" && props.questionData?._id) {
                const response = await customAxios.post(
                    `/api/quiz/${props.quizId}/question/${props.questionData?._id}/update`,
                    JSON.stringify(newQuestion)
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
        <FormProvider {...methods}>
            <BigWrapper>
                <FormContainer
                    onSubmit={handleSubmit(onSubmit)}
                    name={props.questionData ? "update" : "create"}
                >
                    <QuestionFormHeader
                        questionNumber={props.questionData?.questionNumber}
                        point={props.questionData?.point}
                        timeLimit={props.questionData?.timeLimit}
                    />
                    <QuestionInput
                        rows={5}
                        placeholder="Please enter a question..."
                        autoFocus={true}
                        maxLength={500}
                        defaultValue={props.questionData?.question}
                        {...methods.register("question")}
                    />
                    <AnswersGroup selections={props.questionData?.selections} />
                    <ButtonContainer>
                        <SaveButton type="submit">
                            <FontAwesomeIcon icon={faFloppyDisk} /> Save
                        </SaveButton>
                        <ResetButton
                            type="button"
                            onClick={() => {
                                props.closeModal();
                            }}
                        >
                            <FontAwesomeIcon icon={faBan} /> Cancel
                        </ResetButton>
                    </ButtonContainer>
                </FormContainer>
            </BigWrapper>
        </FormProvider>
    );
};

export default QuestionCreateForm;
