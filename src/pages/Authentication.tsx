import Main from "../Layout/Main";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import AuthFormContext from "../context/AuthFormContext";

const Authentication = () => {
    return (
        <Main>
            <Navbar isHideButtons={true}/>
            <AuthFormContext>
                <AuthForm />
            </AuthFormContext>
        </Main>
    );
};

export default Authentication;
