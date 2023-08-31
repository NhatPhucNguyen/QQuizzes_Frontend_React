import { styled } from "styled-components";
import { FormTitle, LoginButton, SignUpButton } from ".";
import { useAuthFormContext } from "../../context/AuthFormContext";
import { devices } from "../../utils/devices";
const SwitchFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
    border-left: 1px solid #acacac;
    @media screen and (${devices.phones}) {
        gap: 0.5rem;
        padding: 1rem;
    }
`;
const SwitchForm = () => {
    const { isSwitch, setIsSwitch } = useAuthFormContext();
    const handleClick = () => {
        setIsSwitch(!isSwitch);
    };
    return (
        <SwitchFormContainer>
            <FormTitle>
                {isSwitch
                    ? "Already have an account ?"
                    : "Do not have an account ?"}
            </FormTitle>
            {isSwitch ? (
                <LoginButton onClick={handleClick}>Login</LoginButton>
            ) : (
                <SignUpButton onClick={handleClick}>Sign Up</SignUpButton>
            )}
        </SwitchFormContainer>
    );
};

export default SwitchForm;
