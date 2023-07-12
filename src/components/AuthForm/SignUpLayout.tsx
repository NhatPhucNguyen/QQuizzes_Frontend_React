import { AuthLayout } from ".";
import SignUpForm from "./SignUpForm";
import SwitchForm from "./SwitchForm";

const SignUpLayout = () => {
    return (
        <AuthLayout>
            <SignUpForm />
            <SwitchForm />
        </AuthLayout>
    );
};

export default SignUpLayout;
