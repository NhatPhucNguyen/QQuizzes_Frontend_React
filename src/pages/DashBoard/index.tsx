import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Confirmation from "../../components/Confirmation";
import Navbar from "../../components/Navbar";
import SelectionBoard from "../../components/SelectionBoard";
import Sidebar from "../../components/Sidebar";
import {
    IAlert,
    IQuiz,
    ModalCloseOptions,
    ModalOptions,
    ShowModal,
} from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import NotificationBar from "../../components/NotificationBar";
import SidebarContext from "../../context/SidebarContext";

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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    overflow-y: auto;
`;
const DashBoard = () => {
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    const [notification, setNotification] = useState<IAlert>({
        isShow: false,
        message: "",
    });
    //open specific form modal
    const openModal = ({ formName, quizData }: ModalOptions) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            quizData: quizData as IQuiz,
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
            <SidebarContext>
                <Navbar isShowBurgerBar={true} height="3.5rem" />
                <Content>
                    <Sidebar openModal={openModal} />
                    {/* Display notification */}
                    {notification.isShow && (
                        <NotificationBar
                            message={notification.message}
                            closeNotification={() => {
                                setNotification({
                                    ...notification,
                                    isShow: false,
                                });
                            }}
                        />
                    )}
                    {/* Display from base on specific route*/}
                    <OutletContainer>
                        <Outlet context={{ openModal, closeModal }} />
                    </OutletContainer>
                    {showModal.isShow &&
                        showModal.formName === "QuizCreate" && (
                            <SelectionBoard closeModal={closeModal} />
                        )}
                    {showModal.isShow &&
                        showModal.formName === "Confirmation" && (
                            <Confirmation
                                quiz={showModal.quizData as IQuiz}
                                closeModal={closeModal}
                            />
                        )}
                </Content>
            </SidebarContext>
        </Container>
    );
};

export default DashBoard;
