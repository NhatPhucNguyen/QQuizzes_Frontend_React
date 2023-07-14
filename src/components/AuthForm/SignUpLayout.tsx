import { AuthLayout } from ".";
import SignUpForm from "./SignUpForm";
import SwitchForm from "./SwitchForm";

const SignUpLayout = () => {
    return (
        <AuthLayout $isAutoHeight={true}>
            <SignUpForm />
            <SwitchForm />
        </AuthLayout>
    );
};

export default SignUpLayout;
