import {
    faCirclePlus,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { ModalContext } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    @media screen and (${devices.phones}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const SearchContainer = styled.form`
    width: 60%;
    display: grid;
    grid-template-columns: 80% 20%;
    padding: 0.2rem;
    border: 1px solid #ccbeb8;
    @media screen and (${devices.phones}) {
        width: 100%;
    }
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
    @media screen and (${devices.phones}) {
        width: 50%;
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
                <SearchButton>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Find
                </SearchButton>
            </SearchContainer>
            <CreateButton
                onClick={() => {
                    modalContext.openModal({ formName: "QuestionCreate" });
                }}
            >
                <FontAwesomeIcon icon={faCirclePlus} /> New question
            </CreateButton>
        </Container>
    );
};

export default QuestionListFunctions;
