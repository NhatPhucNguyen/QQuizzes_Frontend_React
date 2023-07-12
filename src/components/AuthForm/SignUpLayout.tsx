import { AuthLayout } from ".";
import SignUpForm from "./SignUpForm";
import SwitchForm from "./SwitchForm";

const SignUpLayout = () => {
    return (
        <AuthLayout formName="SignUp">
            <SignUpForm />
            <SwitchForm />
        </AuthLayout>
    );
};

export default SignUpLayout;
