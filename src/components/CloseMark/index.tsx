import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { styled } from "styled-components";
const CloseMarkWrapper = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 100%;
    color: #F28585;
    border: none;
    outline: none;
    background-color: inherit;
    &:hover{
        cursor: pointer;
        color: #cd4c4c;
    }
`;
const CloseMark = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <CloseMarkWrapper onClick={closeModal}>
            <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
        </CloseMarkWrapper>
    );
};

export default CloseMark;
