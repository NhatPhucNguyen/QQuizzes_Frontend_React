import { AuthLayout } from ".";
import SignUpForm from "./SignUpForm";
import SwitchForm from "./SwitchForm";

const SignUpLayout = () => {
    return (
        <AuthLayout $isAutoHeight={true} role="signUp-layout">
            <SignUpForm />
            <SwitchForm />
        </AuthLayout>
    );
};

export default SignUpLayout;
