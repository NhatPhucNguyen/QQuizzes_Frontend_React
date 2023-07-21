/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { styled } from "styled-components";
import CollectionFormController from "./CollectionFormController";
import {
    Field,
    FieldError,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { ICollection } from "../../interfaces/app_interfaces";
import { useState } from "react";
import Alert from "../AuthForm/Alert";
import { customAxios } from "../../config/axiosConfig";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type CustomProps = {
    selection: string;
    selectionTitle: string;
};

const Title = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const Button = styled.button`
    border: none;
    padding: 1rem;
    background-color: green;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;

const CollectionCreate = (props: CustomProps) => {
    const methods = useForm<ICollection>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ isShow: false, message: "" });
    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<ICollection> = async (data, e) => {
        e?.preventDefault();
        try {
            const response = await customAxios.post(
                "/api/collection/create",
                JSON.stringify(data)
            );
            if(response.status === 200){
                navigate(`collection/${data.collectionName}/create`)
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
    const onInvalid: SubmitErrorHandler<ICollection> = (err, e) => {
        e?.preventDefault();
        if (err) {
            setAlert({ isShow: true, message: "Missing required fields" });
        }
    };
    return (
        <FormProvider {...methods}>
            <FormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Title>{props.selectionTitle}</Title>
                {alert.isShow && <Alert message={alert.message} />}
                <CollectionFormController
                    type="text"
                    label="Collection Name"
                    id="collectionName"
                />
                <CollectionFormController
                    type="text"
                    label="Topic"
                    id="topic"
                />
                <CollectionFormController
                    type="text"
                    label="Level"
                    id="level"
                />
                <Button type="submit">Create</Button>
            </FormContainer>
        </FormProvider>
    );
};

export default CollectionCreate;
