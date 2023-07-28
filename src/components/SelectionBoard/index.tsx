import { styled } from "styled-components";
import Modal from "../Modal";
import { useState } from "react";
import Selections from "./Selections";
import CollectionForm from "../CollectionForm";
import CloseMark from "../CloseMark";

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

const Title = styled.h2`
    font-weight: bold;
    text-align: center;
`;

const SelectionBoard = (props: CustomProps) => {
    const [showForm, setShowForm] = useState({} as ShowForm);
    return (
        <Modal>
            {!showForm.isShow ? (
                <Container>
                    <CloseMark closeModal={props.closeModal}/>
                    <Title>What would you like to create ?</Title>
                    <Selections setShowForm={setShowForm} />
                </Container>
            ) : (
                <CollectionForm
                    selection={showForm.selection}
                    title={showForm.selectionTitle}
                    closeModal={props.closeModal}
                />
            )}
        </Modal>
    );
};

export default SelectionBoard;
