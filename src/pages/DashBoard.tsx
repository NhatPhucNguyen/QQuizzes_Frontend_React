import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InitialContent from "../components/InitialContent";
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
    const [isShow, setIsShow] = useState(false);
    const openModal = () => {
        setIsShow(true);
    };
    const closeModal = () => {
        setIsShow(false);
    };
    return (
        <Container>
            <Sidebar openModal={openModal} />
            <Content>
                <Navbar
                    isHideLogo={true}
                    isHideButtons={true}
                    height="3.5rem"
                />
                <InitialContent isShowModal={isShow} closeModal={closeModal}/>
            </Content>
        </Container>
    );
};

export default DashBoard;
