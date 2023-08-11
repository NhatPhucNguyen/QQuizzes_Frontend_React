import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { useState } from "react";
import Selections from "./Selections";
import CollectionForm from "../QuizForm";
import CloseMark from "../CloseMark";
import { devices } from "../../utils/devices";

type CustomProps = {
    closeModal: () => void;
};

export type ShowForm = {
    selection: string;
    selectionTitle: string;
    isShow: boolean;
};

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

const SelectionsContainer = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    position: relative;
    border-radius: 25px;
    animation: ${moveLeft} 0.4s ease-in-out;
    @media screen and (${devices.phones}){
        width: 90%;
    }
`;

const Title = styled.h2`
    font-weight: bold;
    text-align: center;
    @media screen and (${devices.phones}){
        font-size: 1.2rem;
        width: 80%;
    }
`;

const SelectionBoard = (props: CustomProps) => {
    const [showForm, setShowForm] = useState({} as ShowForm);
    const backToSelection = () => {
        setShowForm({ ...showForm, isShow: false });
    };
    return (
        <Modal>
            {!showForm.isShow ? (
                <SelectionsContainer>
                    <CloseMark closeModal={props.closeModal} />
                    <Title>What would you like to create ?</Title>
                    <Selections setShowForm={setShowForm} />
                </SelectionsContainer>
            ) : (
                <CollectionForm
                    selection={showForm.selection}
                    title={showForm.selectionTitle}
                    closeModal={props.closeModal}
                    backToSelection={backToSelection}
                />
            )}
        </Modal>
    );
};

export default SelectionBoard;
