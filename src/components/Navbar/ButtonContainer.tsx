import { styled } from "styled-components";
import { devices } from "../../utils/devices";
import { useNavigate } from "react-router-dom";

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
const LoginButton = styled.button`
    width: 8rem;
    border: 2px solid #ffffff;
    border-radius: 25px;
    font-size: 1.2rem;
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
        font-size: 1rem;
    }
`;
const SignUpButton = styled(LoginButton)`
    border: 2px solid #05386b;
    color: #05386b;
`;
const ButtonContainer = () => {
    const navigate = useNavigate();
    return (
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
    );
};

export default ButtonContainer;
