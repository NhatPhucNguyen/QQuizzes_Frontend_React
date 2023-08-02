import { styled } from "styled-components";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import InitialContent from "./InitialContent";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SelectionBoard from "../../components/SelectionBoard";
import { IQuiz, ShowModal } from "../../interfaces/app_interfaces";
import QuizForm from "../../components/QuizForm";
import Modal from "../../Layout/ModalLayout";

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
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    //open specific form modal
    const openModal = (formName?: string, quizData?: IQuiz) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            quizData: quizData,
        });
    };
    const closeModal = () => {
        setShowModal({ ...showModal, isShow: false });
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
                {/* Display from base on specific route*/}
                <Outlet context={{ openModal, closeModal }} />
                {showModal.isShow &&
                    showModal.formName === "QuizForm" && (
                        <Modal>
                            <QuizForm
                                quizData={showModal.quizData}
                                closeModal={closeModal}
                                title="Update Quiz"
                            />
                        </Modal>
                    )}
                {showModal.isShow &&
                    showModal.formName === "QuizCreate" && (
                        <SelectionBoard closeModal={closeModal} />
                    )}
            </Content>
        </Container>
    );
};

export default DashBoard;
