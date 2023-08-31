import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Confirmation from "../../components/Confirmation";
import Navbar from "../../components/Navbar";
import SelectionBoard from "../../components/SelectionBoard";
import Sidebar from "../../components/Sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import {
    IAlert,
    IQuiz,
    ModalCloseOptions,
    ModalOptions,
    ShowModal,
} from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import NotificationBar from "../../components/NotificationBar";

const Container = styled.div`
    display: grid;
    grid-template-columns: 10rem auto;
    height: 100dvh;
    overflow-y: hidden;
    @media screen and (${devices.phones}) {
        display: block;
    }
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;
const OutletContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    flex-wrap: wrap;
`;
const DashBoard = () => {
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    const [isShowSidebar, setIsShowSidebar] = useState(false);
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
    //open sidebar when click burger bars
    const openSideBar = () => {
        setIsShowSidebar(true);
    };
    //close side bar when tab items clicked or arrow button icon clicked
    const closeSideBar = () => {
        setIsShowSidebar(false);
    };
    return (
        <Container>
            <SidebarContext.Provider value={{ closeSidebar: closeSideBar }}>
                <Sidebar
                    isShowSidebar={isShowSidebar}
                    closeSidebar={closeSideBar}
                    openModal={openModal}
                />
            </SidebarContext.Provider>
            <Content>
                <Navbar
                    openSidebar={openSideBar}
                    isHideLogo={true}
                    isHideButtons={true}
                    height="3.5rem"
                />
                {/* Display notification */}
                {notification.isShow && (
                    <NotificationBar
                        message={notification.message}
                        closeNotification={() => {
                            setNotification({ ...notification, isShow: false });
                        }}
                    />
                )}
                {/* Display from base on specific route*/}
                <OutletContainer>
                    <Outlet context={{ openModal, closeModal }} />
                </OutletContainer>
                {showModal.isShow && showModal.formName === "QuizCreate" && (
                    <SelectionBoard closeModal={closeModal} />
                )}
                {showModal.isShow && showModal.formName === "Confirmation" && (
                    <Confirmation
                        quiz={showModal.quizData as IQuiz}
                        closeModal={closeModal}
                    />
                )}
            </Content>
        </Container>
    );
};

export default DashBoard;
