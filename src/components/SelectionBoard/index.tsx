import { styled } from "styled-components";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Selections from "./Selections";
import CollectionForm from "../CollectionForm";

type CustomProps = {
    closeModal: () => void;
};

export type ShowForm = {
    selection: string;
    selectionTitle: string;
    isShow: boolean;
};

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

const Title = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
`;

const CloseMark = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
`;
const SelectionBoard = (props: CustomProps) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState({} as ShowForm);
    return (
        <Modal>
            {!showForm.isShow ? (
                <Container>
                    <CloseMark onClick={props.closeModal}>X</CloseMark>
                    <Title>What would you like to create ?</Title>
                    <Selections setShowForm={setShowForm} />
                </Container>
            ) : (
                <CollectionForm
                    selection={showForm.selection}
                    selectionTitle={showForm.selectionTitle}
                    closeModal={props.closeModal}
                />
            )}
        </Modal>
    );
};

export default SelectionBoard;
