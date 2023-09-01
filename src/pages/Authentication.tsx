import Main from "../Layout/Main";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import AuthFormProvider from "../context/AuthFormContext";

const Authentication = () => {
    return (
        <Main>
            <Navbar isHideButtons={true}/>
            <AuthFormProvider>
                <AuthForm />
            </AuthFormProvider>
        </Main>
    );
};

export default Authentication;
