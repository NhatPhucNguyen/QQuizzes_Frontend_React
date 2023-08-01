import { ReactNode } from "react";
import { keyframes, styled } from "styled-components";

const moveDown = keyframes`
    from{
        opacity: 0;
        scale: 0.5;
    }
    to{
        opacity: 1;
        scale: 1;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: rgb(55, 54, 54, 0.4);
    position: absolute;
    left: 0;
    top: 0;
    animation: ${moveDown} 0.4s ease-in-out;
`;
const Modal = ({ children }: { children: ReactNode }) => {
    return <Container>{children}</Container>;
};

export default Modal;
