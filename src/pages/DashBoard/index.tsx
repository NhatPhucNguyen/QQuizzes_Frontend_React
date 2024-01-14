import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Navbar from "../../components/Navbar";
import SelectionBoard from "../../components/SelectionBoard";
import Sidebar from "../../components/Sidebar";
import { devices } from "../../config/devices";
import ModalProvider from "../../context/ModalContext";
import SidebarProvider from "../../context/SidebarContext";
import {
    Alert,
    Quiz,
    ModalCloseOptions,
    ModalOptions,
    ShowModal,
} from "../../interfaces/app_interfaces";

const Container = styled.div`
    height: 100%;
    overflow-y: hidden;
`;
const Content = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 10rem auto;
    height: calc(100% - 3.5rem);
    @media screen and (${devices.phones}) {
        display: block;
    }
`;
const OutletContainer = styled.div`
    height: 100%;
    overflow-y: auto;
`;
const DashBoard = () => {
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    const [notification, setNotification] = useState<Alert>({
        isShow: false,
        message: "",
    });
    //open specific form modal
    const openModal = ({ formName, quizData }: ModalOptions) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            quizData: quizData as Quiz,
        });
        setNotification({ ...notification, isShow: false });
    };
    //close modal
    const closeModal = (options?: ModalCloseOptions) => {
        setShowModal({ ...showModal, isShow: false });
        if (options?.isDisplayNotification) {
            setNotification({ isShow: true, message: options.message });
        }
    };
    return (
        <Container>
            <SidebarProvider>
                <Navbar isShowBurgerBar={true} height="3.5rem" />
                <ModalProvider>
                    <Content>
                        <Sidebar openModal={openModal} />{" "}
                        <OutletContainer>
                            <Outlet />
                        </OutletContainer>
                        {showModal.isShow && (
                            <SelectionBoard closeModal={closeModal} />
                        )}
                    </Content>
                </ModalProvider>
            </SidebarProvider>
        </Container>
    );
};

export default DashBoard;
