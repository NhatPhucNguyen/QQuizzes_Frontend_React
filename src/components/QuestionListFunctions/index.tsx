import { styled } from "styled-components";
import { FormEvent } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutletContext } from "react-router-dom";
import { ModalContext } from "../../interfaces/app_interfaces";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    position: sticky;
`;

const SearchContainer = styled.form`
    width: 60%;
    display: grid;
    grid-template-columns: 80% 20%;
    padding: 0.2rem;
    border: 1px solid #ccbeb8;
`;
const SearchBox = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 0 1rem;
    font-size: inherit;
    font-family: inherit;
`;
const SearchButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    background-color: rgb(153, 110, 92, 0.9);
    border: none;
    outline: none;
    color: #ffffff;
    font-family: inherit;
    font-weight: bold;
    font-size: inherit;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        background-color: rgb(153, 110, 92);
    }
`;
const CreateButton = styled.button`
    width: 20%;
    padding: 0.5rem;
    background-color: rgb(153, 110, 92, 0.9);
    border: none;
    outline: none;
    color: #ffffff;
    font-family: inherit;
    font-weight: bold;
    font-size: inherit;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        background-color: rgb(153, 110, 92);
    }
`;
const QuestionListFunctions = () => {
    const modalContext = useOutletContext<ModalContext>();
    return (
        <Container>
            <SearchContainer
                onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
            >
                <SearchBox
                    type="text"
                    placeholder="Search from your questions"
                />
                <SearchButton>Find</SearchButton>
            </SearchContainer>
            <CreateButton
                onClick={() => {
                    modalContext.openModal();
                }}
            >
                <FontAwesomeIcon icon={faCirclePlus} /> New question
            </CreateButton>
        </Container>
    );
};

export default QuestionListFunctions;
