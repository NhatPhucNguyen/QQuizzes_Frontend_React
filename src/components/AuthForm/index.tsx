import { keyframes, styled } from "styled-components";
import LoginLayout from "./LoginLayout";
import SignUpLayout from "./SignUpLayout";
import { useEffect, useState } from "react";
import { AuthFormContext } from "../../context/AuthFormContext";
import { useLocation } from "react-router-dom";
import { devices } from "../../utils/devices";

const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-10px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem;
`;
export const AuthLayout = styled.div<{ $isAutoHeight?: boolean }>`
    display: grid;
    grid-template-columns: auto auto;
    width: 60%;
    height: ${(props) => (props.$isAutoHeight ? "auto" : "100%")};
    background-color: #F2E8DF;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 15px;
    animation: ${moveDown} 0.4s ease-in-out;
    @media only screen and (${devices.tablets}) {
        width: 80%;
    }
    @media only screen and (${devices.phones}) {
        width: 100%;
        grid-template-columns: 55% 45%;
        font-size: 1rem;
    }
`;
export const FormLayout = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    @media only screen and (${devices.phones}) {
        padding: 0.5rem;
    }
`;
export const LoginButton = styled.button`
    background-color: #afd270;
    font-size: inherit;
    font-family: inherit;
    width: 8rem;
    padding: 0.5rem;
    border: none;
    border-radius: 50px;
    color: #ffffff;
    font-weight: bolder;
    &:hover {
        cursor: pointer;
        background-color: #8ac222;
    }
`;
export const SignUpButton = styled(LoginButton)`
    background-color: #d2284d;
    &:hover {
        background-color: #aa1434
    }
`;
export const FormTitle = styled.span`
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
    @media only screen and (${devices.phones}) {
        font-size: 1rem;
    }
`;
const AuthForm = () => {
    const location: { state?: { isSwitch?: boolean } } = useLocation();
    const [isSwitch, setIsSwitch] = useState(false);
    useEffect(() => {
        if (location.state?.isSwitch) {
            setIsSwitch(true);
        }
    }, [location.state?.isSwitch]);
    return (
        <AuthFormContext.Provider value={{ isSwitch, setIsSwitch }}>
            <MainContainer>
                {isSwitch ? <SignUpLayout /> : <LoginLayout />}
            </MainContainer>
        </AuthFormContext.Provider>
    );
};

export default AuthForm;
