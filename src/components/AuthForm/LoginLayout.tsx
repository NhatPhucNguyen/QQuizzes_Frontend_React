import { AuthLayout } from ".";
import LoginForm from "./LoginForm";

const LoginLayout = () => {
    return (
        <AuthLayout>
            <LoginForm />
            <h2>Sign up link</h2>
        </AuthLayout>
    );
};

export default LoginLayout;
