/* eslint-disable @typescript-eslint/no-misused-promises */
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import { styled } from "styled-components";
import QuizCreateBoard from "../components/QuizCreateBoard";
import { FormEvent, useCallback, useMemo, useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { IQuestion } from "../interfaces/app_interfaces";
import { MultiChoiceContext } from "../context/MultiChoiceContext";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../config/axiosConfig";

const BigForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: visible;
    height: max-content;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    padding: 1rem;
`;
const Button = styled.button`
    padding: 1rem;
    font-size: 1rem;
    background-color: #ffffff;
    border: none;
    outline: none;
    &:hover {
        cursor: pointer;
    }
`;
const MultipleChoiceCreate = () => {
    const methods = useForm<IQuestion>();
    const { handleSubmit } = methods;
    const [quizArr, setQuizArr] = useState<IQuestion[]>([]);
    const { collectionName } = useParams() as { collectionName: string };
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<IQuestion> = (data, e) => {
        e?.preventDefault();
        console.log(data);
        setQuizArr((prevArr) => {
            return [...prevArr, data];
        });
    };
    return (
        <FormProvider {...methods}>
            <BigForm onSubmit={handleSubmit(onSubmit)}>
                <Navbar isHideButtons={true} />
                <MultiChoiceContext.Provider value={{ questionArr: quizArr }}>
                    <SubNav collectionName={collectionName || ""} />
                </MultiChoiceContext.Provider>
                <MainContainer>
                    <QuizCreateBoard />
                    <Button type="submit">Next</Button>
                </MainContainer>
            </BigForm>
        </FormProvider>
    );
};

export default MultipleChoiceCreate;
