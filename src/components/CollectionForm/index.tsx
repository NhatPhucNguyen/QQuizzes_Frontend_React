/* eslint-disable @typescript-eslint/no-misused-promises */
import { styled } from "styled-components";
import CollectionFormController from "./CollectionFormController";
import {
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { ICollection } from "../../interfaces/app_interfaces";
import { FormEvent, useState } from "react";
import Alert from "../AuthForm/Alert";
import { customAxios } from "../../config/axiosConfig";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type CustomProps = {
    selection?: string;
    selectionTitle?: string;
    collectionData?: ICollection;
    closeModal: () => void;
};

const Title = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
`;

const Container = styled.div`
    width: 50%;
    padding: 1rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    position: relative;
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
    color: #ffffff;
    &:hover {
        cursor: pointer;
    }
`;

const CloseMark = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
`;
const CollectionForm = (props: CustomProps) => {
    const methods = useForm<ICollection>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ isShow: false, message: "" });
    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<ICollection> = async (data, e) => {
        e?.preventDefault();
        const { name } = e?.target as HTMLFormElement;
        try {
            if (name === "create") {
                //create collection
                const response = await customAxios.post(
                    "/api/collection/create",
                    JSON.stringify(data)
                );
                if (response.status === 200) {
                    navigate(`collection/${data.collectionName}/create`);
                }
            }
            if (name === "update") {
                //update collection
                const response = await customAxios.patch(
                    `/api/collection/update/${
                        props.collectionData?.collectionName as string
                    }`,
                    JSON.stringify(data)
                );
                if (response.status === 200) {
                    props.closeModal();
                    navigate("myCollection");
                }
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
        <Container>
            <CloseMark onClick={props.closeModal}>X</CloseMark>
            <FormProvider {...methods}>
                <FormContainer
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    name={props.collectionData ? "update" : "create"}
                >
                    <Title>{props.selectionTitle}</Title>
                    {alert.isShow && <Alert message={alert.message} />}
                    <CollectionFormController
                        type="text"
                        label="Collection Name"
                        id="collectionName"
                        defaultValue={props.collectionData?.collectionName}
                    />
                    <CollectionFormController
                        type="text"
                        label="Topic"
                        id="topic"
                        defaultValue={props.collectionData?.topic}
                    />
                    <CollectionFormController
                        type="text"
                        label="Level"
                        id="level"
                        defaultValue={props.collectionData?.level}
                    />
                    <Button type="submit">
                        {props.collectionData ? "Update" : "Create"}
                    </Button>
                </FormContainer>
            </FormProvider>
        </Container>
    );
};

export default CollectionForm;
