import { styled } from "styled-components";
import { LoginButton, SignUpButton } from ".";
import { useContext } from "react";
import { AuthFormContext } from "../../context/AuthFormContext";

const SwitchFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
    border-left: 1px solid #acacac;
`;
const Title = styled.span`
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
`;
const SwitchForm = () => {
    const authFormContext = useContext(AuthFormContext);
    const handleClick = () => {
        authFormContext.setIsSwitch(!authFormContext.isSwitch);
    };
    return (
        <SwitchFormContainer>
            <Title>
                {authFormContext.isSwitch
                    ? "Already have an account ?"
                    : "Do not have an account ?"}
            </Title>
            {authFormContext.isSwitch ? (
                <LoginButton onClick={handleClick}>Login</LoginButton>
            ) : (
                <SignUpButton onClick={handleClick}>Sign Up</SignUpButton>
            )}
        </SwitchFormContainer>
    );
};

export default SwitchForm;
