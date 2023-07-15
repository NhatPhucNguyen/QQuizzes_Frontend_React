import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { authenticatedCheck } from "../utils/authenticatedCheck";
import { redirect } from "react-router-dom";

export const authLoader = async () => {
    const isAuthenticated = await authenticatedCheck();
    if (isAuthenticated) {
        return redirect("/");
    }
    return null;
};

const Authentication = () => {
    return (
        <Layout>
            <Navbar isHideButtons={true} />
            <AuthForm />
        </Layout>
    );
};

export default Authentication;
