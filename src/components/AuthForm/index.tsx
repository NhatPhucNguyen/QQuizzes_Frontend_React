import { styled } from "styled-components";
import LoginLayout from "./LoginLayout";
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
`;
export const AuthLayout = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    width: 60%;
    background-color: #ffffff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 15px;
`;
export const FormLayout = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
`;
const AuthForm = () => {
    return (
        <MainContainer>
            <LoginLayout />
        </MainContainer>
    );
};

export default AuthForm;
