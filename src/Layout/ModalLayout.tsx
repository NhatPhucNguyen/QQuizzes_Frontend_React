import { ReactNode, useEffect } from "react";
import { keyframes, styled } from "styled-components";

const moveDown = keyframes`
    from{
        opacity: 0;
        height: 10%;
    }
    to{
        opacity: 1;
        height: 100%;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: rgb(55, 54, 54, 0.4);
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    animation: ${moveDown} 0.4s ease-in-out;
`;
const Modal = ({ children }: { children: ReactNode }) => {
    const body = document.querySelector("body") as HTMLElement;
    useEffect(() => {
        body.style.overflowY = "hidden";
        return () => {
            body.style.overflow = "auto";
        };
    }, [body.style]);
    return <Container>{children}</Container>;
};

export default Modal;
