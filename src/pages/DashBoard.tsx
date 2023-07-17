import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InitialContent from "../components/InitialContent";

const Container = styled.div`
    display: grid;
    grid-template-columns: 10rem auto;
    height: 100%;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const DashBoard = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Navbar
                    isHideLogo={true}
                    isHideButtons={true}
                    height="3.5rem"
                />
                <InitialContent />
            </Content>
        </Container>
    );
};

export default DashBoard;
