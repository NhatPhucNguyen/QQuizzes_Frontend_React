import { styled } from "styled-components";
import { FormTitle, LoginButton, SignUpButton } from ".";
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
const SwitchForm = () => {
    const authFormContext = useContext(AuthFormContext);
    const handleClick = () => {
        authFormContext.setIsSwitch(!authFormContext.isSwitch);
    };
    return (
        <SwitchFormContainer>
            <FormTitle>
                {authFormContext.isSwitch
                    ? "Already have an account ?"
                    : "Do not have an account ?"}
            </FormTitle>
            {authFormContext.isSwitch ? (
                <LoginButton onClick={handleClick}>Login</LoginButton>
            ) : (
                <SignUpButton onClick={handleClick}>Sign Up</SignUpButton>
            )}
        </SwitchFormContainer>
    );
};

export default SwitchForm;
