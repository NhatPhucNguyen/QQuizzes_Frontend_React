import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { devices } from "../../utils/devices";
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
    @media screen and (${devices.phones}){
        flex-direction: column;
        font-size: 90%;
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
