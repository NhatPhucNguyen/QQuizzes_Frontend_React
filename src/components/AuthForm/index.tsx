import { keyframes, styled } from "styled-components";
import LoginLayout from "./LoginLayout";
import SignUpLayout from "./SignUpLayout";
import { devices } from "../../config/devices";
import { useAuthFormContext } from "../../context/AuthFormContext";

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
    min-height: 100%;
    padding: 1rem;
`;
export const AuthLayout = styled.div<{ $isAutoHeight?: boolean }>`
    display: grid;
    grid-template-columns: auto auto;
    width: 60%;
    height: ${(props) => (props.$isAutoHeight ? "auto" : "70%")};
    background-color: #f2e8df;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 15px;
    animation: ${moveDown} 0.4s ease-in-out;
    @media screen and (${devices.tablets}) {
        width: 80%;
        height: auto;
    }
    @media screen and (${devices.phones}) {
        width: 100%;
        grid-template-columns: none;
        font-size: 1rem;
        height: auto;
    }
    @media (${devices.phones}) {
        display: none;
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
    @media screen and (${devices.phones}) {
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
        background-color: #aa1434;
    }
`;
export const FormTitle = styled.span`
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
    @media screen and (${devices.phones}) {
        font-size: 1rem;
    }
`;
const AuthForm = () => {
    const { isSwitch } = useAuthFormContext();
    return (
        <MainContainer>
            {isSwitch ? <SignUpLayout /> : <LoginLayout />}
        </MainContainer>
    );
};

export default AuthForm;
