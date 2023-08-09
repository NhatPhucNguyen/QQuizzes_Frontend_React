import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Main from "../../Layout/Main";
import Modal from "../../Layout/ModalLayout";
import Navbar from "../../components/Navbar";
import QuestionCreateForm from "../../components/QuestionCreateForm";
import SubNav from "../../components/SubNav";
import { IQuestion, ShowModal } from "../../interfaces/app_interfaces";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100%;
`;

const QuestionManagement = () => {
    const [showModal, setShowModal] = useState<ShowModal>();
    const openModal = (questionData?: IQuestion) => {
        setShowModal({
            ...showModal,
            isShow: true,
            questionData: questionData,
        });
    };
    const closeModal = () => {
        setShowModal({ ...showModal, isShow: false });
    };
    const { quizId } = useParams();
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} isHideBars={true}/>
            <SubNav isShowQuestNum={false} />
            <Container>
                <Outlet context={{ openModal }} />
            </Container>
            {showModal?.isShow && (
                <Modal>
                    <QuestionCreateForm
                        closeModal={closeModal}
                        quizId={quizId as string}
                        questionData={showModal.questionData}
                    />
                </Modal>
            )}
        </Main>
    );
};

export default QuestionManagement;
