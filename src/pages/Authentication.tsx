import Main from "../Layout/Main";
import Layout from "../Layout/Main";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

const Authentication = () => {
    return (
        <Main>
            <Navbar isHideButtons={true} />
            <AuthForm />
        </Main>
    );
};

export default Authentication;
