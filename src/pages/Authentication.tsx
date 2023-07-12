import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
const Authentication = () => {
    return (
        <Layout>
            <Navbar isHideButtons={true}/>
            <AuthForm />
        </Layout>
    );
};

export default Authentication;
