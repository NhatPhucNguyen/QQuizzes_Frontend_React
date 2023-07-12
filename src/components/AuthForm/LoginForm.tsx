import { FormLayout, FormTitle, LoginButton } from ".";
import FormController from "./FormController";

const LoginForm = () => {
    return (
        <FormLayout>
            <FormTitle>Login to QQuizzes</FormTitle>
            <FormController
                name="username"
                label="Username"
                type="text"
                value="test"
            />
            <FormController
                name="password"
                label="Password"
                type="password"
                value="password"
            />
            <LoginButton type="submit">Login</LoginButton>
        </FormLayout>
    );
};

export default LoginForm;
