import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SubNav from "../../components/SubNav";
import Main from "../../Layout/Main";
import { styled } from "styled-components";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { IQuiz, ShowModal } from "../../interfaces/app_interfaces";
import Modal from "../../Layout/ModalLayout";
import QuestionCreateForm from "../../components/QuestionCreateForm";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    height: auto;
`;

const QuestionManagement = () => {
    const [showModal, setShowModal] = useState<ShowModal>();
    const openModal = () => {
        setShowModal({ ...showModal, isShow: true });
    };
    const closeModal = () => {
        setShowModal({ ...showModal, isShow: false });
    };
    const { quizId } = useParams();
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} />
            <SubNav isShowQuestNum={false} />
            <Container>
                <Outlet context={{ openModal }} />
            </Container>
            {showModal?.isShow && (
                <Modal>
                    <QuestionCreateForm
                        closeModal={closeModal}
                        quizId={quizId as string}
                    />
                </Modal>
            )}
        </Main>
    );
};

export default QuestionManagement;
