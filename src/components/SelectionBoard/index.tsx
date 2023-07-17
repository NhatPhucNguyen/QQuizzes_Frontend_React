import { styled } from "styled-components";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

type CustomProps = {
    closeModal: () => void;
};

const Container = styled.div`
    width: 70%;
    height: 70%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    position: absolute;
`;

const Title = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
`;
const SelectionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
    justify-content: center;
`;
const SelectionItem = styled.button`
    width: 15rem;
    outline: none;
    border: none;
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 50px;
    background-color: #39f339;
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
const SelectionBoard = (props: CustomProps) => {
    const navigate = useNavigate();
    return (
        <Modal>
            <Container>
                <CloseMark onClick={props.closeModal}>X</CloseMark>
                <Title>What would you like to create ?</Title>
                <SelectionsContainer>
                    <SelectionItem
                        onClick={() => {
                            navigate("/collection/create");
                        }}
                    >
                        Multiple Choices
                    </SelectionItem>
                    <SelectionItem disabled>Fill in blank</SelectionItem>
                    <SelectionItem disabled>Reorder</SelectionItem>
                    <SelectionItem disabled>True/False</SelectionItem>
                </SelectionsContainer>
            </Container>
        </Modal>
    );
};

export default SelectionBoard;
