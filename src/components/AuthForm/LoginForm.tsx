import { styled } from "styled-components";
import { FormLayout } from ".";
import FormController from "./FormController";
const Title = styled.span`
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
`
const LoginForm = () => {
    return (
        <FormLayout>
            <Title>Login to QQuizzes</Title>
            <FormController name="username" label="Username" type="text"/>
        </FormLayout>
    );
};

export default LoginForm;
