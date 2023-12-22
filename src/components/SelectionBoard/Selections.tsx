import { styled } from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { ShowForm } from ".";
import { devices } from "../../config/devices";

const SelectionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 2rem;
    padding: 1rem;
    justify-content: center;
    @media screen and (${devices.phones}){
        display: flex;
        flex-direction: column;
    }
`;
const SelectionItem = styled.button`
    width: 15rem;
    outline: none;
    border: none;
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 50px;
    background-color: #DBF227;
    color: #042940;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: #9FC131;
    }
    &:disabled{
        background-color: #bdbdbd;
    }
`;
const Selections = ({
    setShowForm,
}: {
    setShowForm: Dispatch<SetStateAction<ShowForm>>;
}) => {
    return (
        <SelectionsContainer>
            <SelectionItem
                onClick={() => {
                    setShowForm({
                        isShow: true,
                        selection: "multipleChoice",
                        selectionTitle: "Multiple Choice",
                    });
                }}
            >
                Multiple Choices
            </SelectionItem>
            <SelectionItem disabled>Fill in blank</SelectionItem>
            <SelectionItem disabled>Reorder</SelectionItem>
            <SelectionItem disabled>True/False</SelectionItem>
        </SelectionsContainer>
    );
};

export default Selections;
