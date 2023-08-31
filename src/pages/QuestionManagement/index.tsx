import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Main from "../../Layout/Main";
import Modal from "../../Layout/ModalLayout";
import Navbar from "../../components/Navbar";
import QuestionCreateForm from "../../components/QuestionCreateForm";
import SubNav from "../../components/SubNav";
import {
    IAlert,
    IQuestion,
    IQuiz,
    ModalCloseOptions,
    ModalOptions,
    ShowModal,
} from "../../interfaces/app_interfaces";
import QuizForm from "../../components/QuizForm";
import NotificationBar from "../../components/NotificationBar";
import Confirmation from "../../components/Confirmation";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100%;
`;

const QuestionManagement = () => {
    const [showModal, setShowModal] = useState<ShowModal>({} as ShowModal);
    const [notification, setNotification] = useState<IAlert>({
        isShow: false,
        message: "",
    });
    const openModal = (options: ModalOptions = {}) => {
        setShowModal({
            ...showModal,
            isShow: true,
            questionData: options.questionData,
            formName: options.formName,
            quizData: options.quizData,
        });
        setNotification({ ...notification, isShow: false });
    };

    const closeModal = (options?: ModalCloseOptions) => {
        setShowModal({ ...showModal, isShow: false });
        if (options?.isDisplayNotification) {
            setNotification({ isShow: true, message: options.message });
        }
    };
    const { quizId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate("questions");
    }, []);
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} isHideBars={true} />
            <SubNav />
            {notification.isShow && (
                <NotificationBar
                    message={notification.message}
                    closeNotification={() => {
                        setNotification({ ...notification, isShow: false });
                    }}
                />
            )}
            <Container>
                <Outlet context={{ openModal }} />
            </Container>
            {showModal?.isShow && (
                <>
                    {showModal.formName === "QuizForm" && (
                        <QuizForm
                            closeModal={closeModal}
                            quizData={showModal.quizData}
                        />
                    )}
                    {showModal.formName === "QuestionCreate" && (
                        <QuestionCreateForm
                            closeModal={closeModal}
                            quizId={quizId as string}
                            questionData={showModal.questionData}
                        />
                    )}
                    {showModal.formName === "Confirmation" && (
                        <Confirmation
                            closeModal={closeModal}
                            question={showModal.questionData}
                        />
                    )}
                </>
            )}
        </Main>
    );
};

export default QuestionManagement;
