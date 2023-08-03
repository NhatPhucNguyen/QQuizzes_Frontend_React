import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SubNav from "../../components/SubNav";
import Main from "../../Layout/Main";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import { IQuiz, ShowModal } from "../../interfaces/app_interfaces";
import Modal from "../../Layout/ModalLayout";
import QuestionCreateForm from "../../components/QuestionCreateForm";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const QuestionManagement = () => {
    const [showModal, setShowModal] = useState<ShowModal>();
    const openModal = () => {
        setShowModal({ ...showModal, isShow: true });
    };
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} />
            <SubNav isShowQuestNum={false} />
            <Container>
                <Outlet context={{openModal}} />
            </Container>
            {showModal?.isShow && (
                <Modal>
                    <QuestionCreateForm/>
                </Modal>
            )}
        </Main>
    );
};

export default QuestionManagement;
