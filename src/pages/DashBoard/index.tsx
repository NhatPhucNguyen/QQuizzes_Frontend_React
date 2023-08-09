import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import Navbar from "../../components/Navbar";
import QuizForm from "../../components/QuizForm";
import SelectionBoard from "../../components/SelectionBoard";
import Sidebar from "../../components/Sidebar";
import { IQuiz, ShowModal } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";
import { SidebarContext } from "../../context/SidebarContext";

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
    //open specific form modal
    const openModal = (formName?: string, quizData?: IQuiz) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            quizData: quizData,
        });
    };
    //close modal
    const closeModal = () => {
        setShowModal({ ...showModal, isShow: false });
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
                {/* Display from base on specific route*/}
                <OutletContainer>
                    <Outlet context={{ openModal, closeModal }} />
                </OutletContainer>
                {showModal.isShow && showModal.formName === "QuizForm" && (
                    <Modal>
                        <QuizForm
                            quizData={showModal.quizData}
                            closeModal={closeModal}
                            title="Update Quiz"
                        />
                    </Modal>
                )}
                {showModal.isShow && showModal.formName === "QuizCreate" && (
                    <SelectionBoard closeModal={closeModal} />
                )}
            </Content>
        </Container>
    );
};

export default DashBoard;
