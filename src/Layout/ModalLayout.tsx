import { ReactNode, useEffect } from "react";
import { styled } from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: rgb(55, 54, 54, 0.5);
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
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
