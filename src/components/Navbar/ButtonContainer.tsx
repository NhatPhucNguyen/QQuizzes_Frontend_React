import { styled } from "styled-components";
import { devices } from "../../config/devices";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { customAxios } from "../../config/axiosConfig";

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;
const LoginButton = styled.button`
    width: 8rem;
    padding: 0.5rem 0rem;
    border: 2px solid #ffffff;
    border-radius: 25px;
    font-size: 1rem;
    font-family: inherit;
    font-weight: bolder;
    background-color: inherit;
    color: #ffffff;
    &:hover {
        cursor: pointer;
        background-color: #F2B263;
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
const Name = styled.span`
    color: #6EFF6B;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
`

const ButtonContainer = () => {
    const navigate = useNavigate();
    const isAuthenticated = useLoaderData() as boolean;
    return (
        <Fragment>
            {isAuthenticated ? (
                <BtnContainer>
                    <Name>{localStorage.getItem("fullName")}</Name>
                    <LogoutButton
                        onClick={() => {
                            const logout = async () => {
                                await customAxios.get("/auth/logout");
                                localStorage.clear();
                                navigate(0);
                            };
                            void logout();
                        }}
                    >
                        Logout
                    </LogoutButton>
                </BtnContainer>
            ) : (
                <BtnContainer>
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
                </BtnContainer>
            )}
        </Fragment>
    );
};

export default ButtonContainer;
