import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Main from "../../Layout/Main";
import Confirmation from "../../components/Confirmation";
import Navbar from "../../components/Navbar";
import NotificationBar from "../../components/NotificationBar";
import QuestionCreateForm from "../../components/QuestionCreateForm";
import QuizForm from "../../components/QuizForm";
import SubNav from "../../components/SubNav";
import { useModalContext } from "../../context/ModalContext";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100%;
`;

const QuestionManagement = () => {
    const { quizId } = useParams();
    const {notification,showModal,closeModal} = useModalContext();
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} />
            <SubNav />
            {notification.isShow && (
                <NotificationBar
                    message={notification.message}
                />
            )}
            <Container>
                <Outlet/>
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
                </>
            )}
        </Main>
    );
};

export default QuestionManagement;
