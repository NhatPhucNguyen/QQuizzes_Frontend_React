import { AuthLayout } from ".";
import LoginForm from "./LoginForm";
import SwitchForm from "./SwitchForm";

const LoginLayout = () => {
    return (
        <AuthLayout>
            <LoginForm />
            <SwitchForm />
        </AuthLayout>
    );
};

export default LoginLayout;
