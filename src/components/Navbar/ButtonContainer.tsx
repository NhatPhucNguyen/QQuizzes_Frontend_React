import { styled } from "styled-components";
import { devices } from "../../utils/devices";
import { useLoaderData, useNavigate } from "react-router-dom";
import { authenticatedCheck } from "../../utils/authenticatedCheck";
import { Fragment } from "react";

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
const LoginButton = styled.button`
    width: 8rem;
    border: 2px solid #ffffff;
    border-radius: 25px;
    font-size: 1rem;
    font-family: inherit;
    font-weight: bolder;
    background-color: inherit;
    color: #ffffff;
    &:hover {
        cursor: pointer;
        background-color: #edba9b;
    }
    @media only screen and (${devices.phones}) {
        width: 5rem;
        font-size: 0.8rem;
    }
`;
const SignUpButton = styled(LoginButton)`
    border: 2px solid #05386b;
    color: #05386b;
`;
const LogoutButton = styled(LoginButton)``;
export const navLoader = async () => {
    const isAuthenticated = await authenticatedCheck();
    return isAuthenticated;
};

const ButtonContainer = () => {
    const navigate = useNavigate();
    const isAuthenticated = useLoaderData() as boolean;
    return (
        <BtnContainer>
            {isAuthenticated ? (
                <LogoutButton>Logout</LogoutButton>
            ) : (
                <Fragment>
                    <LoginButton
                        onClick={() => {
                            navigate("/auth");
                        }}
                    >
                        Login
                    </LoginButton>
                    <SignUpButton
                        onClick={() => {
                            navigate("/auth", { state: { isSwitch: true } });
                        }}
                    >
                        Sign Up
                    </SignUpButton>
                </Fragment>
            )}
        </BtnContainer>
    );
};

export default ButtonContainer;
