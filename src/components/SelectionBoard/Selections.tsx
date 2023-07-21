import { styled } from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { ShowForm } from ".";

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
