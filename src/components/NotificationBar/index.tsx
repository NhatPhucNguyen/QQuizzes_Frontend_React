import React, { useState } from "react";
import { keyframes, styled } from "styled-components";
import { useEffect } from "react";
import Keyframes from "styled-components/dist/models/Keyframes";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../context/ModalContext";

const existTime = 3000; //millisecond
const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateX(1rem);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`;
const fadeOut = keyframes`
    from{
        display: block;
        opacity: 1;
        transform: translateX(0);
    }
    to{
        opacity: 0;
        transform: translateX(1rem);
    }
`;
const Container = styled.div<{ $animName?: Keyframes; $isDisplay?: boolean }>`
    position: fixed;
    right: 1rem;
    top: 1rem;
    padding: 1rem;
    width: 20rem;
    border-radius: 15px;
    background-color: rgb(89, 82, 89);
    display: ${(props) => (props.$animName !== fadeOut ? "block" : "none")};
    animation: ${(props) => props.$animName} 0.4s ease-in-out;
`;
const Message = styled.span`
    color: #ffffff;
    font-size: 0.9rem;
    font-family: inherit;
    margin-left: 1rem;
`;
type CustomProps = {
    message: string;
};
const NotificationBar = (props: CustomProps) => {
    const [anim, setAnim] = useState(fadeIn);
    const { closeNotification } = useModalContext();
    return (
        <Container
            key={props.message}
            onAnimationEndCapture={() => {
                setTimeout(() => {
                    setAnim(fadeOut);
                }, existTime);
                setTimeout(() => {
                    closeNotification();
                }, existTime + 1000);
            }}
            $animName={anim}
        >
            <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff" }} />
            <Message>{props.message}</Message>
        </Container>
    );
};

export default NotificationBar;
