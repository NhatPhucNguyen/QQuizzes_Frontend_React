import { useQuery } from "react-query";
import { styled } from "styled-components";
import Confirmation from "../../components/Confirmation";
import NotificationBar from "../../components/NotificationBar";
import QuizCard from "../../components/QuizCard";
import { devices } from "../../config/devices";
import { useModalContext } from "../../context/ModalContext";
import { Quiz } from "../../interfaces/app_interfaces";
import { getPrivateQuizzes } from "../../apis/QuizAPI";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    width: 100%;
    overflow: visible;
`;

const Title = styled.h1`
    text-align: center;
`;
const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 17rem);
    gap: 1rem;
    padding: 1rem;

    @media screen and (${devices.laptops}) {
        grid-template-columns: repeat(auto-fill, 15rem);
    }
    @media screen and (${devices.tablets}) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (${devices.phones}) {
        grid-template-columns: repeat(auto-fill, 90%);
        justify-content: center;
    }
`;
const MyQuizzes = () => {
    const { showModal, notification } = useModalContext();
    const { data: quizzes } = useQuery({
        queryFn: () => getPrivateQuizzes(),
        queryKey: ["myQuizzes"],
    });
    return (
        <Container>
            {notification.isShow && (
                <NotificationBar message={notification.message} />
            )}
            <Title>Manage Your Quizzes</Title>
            <CardsContainer key={showModal.formName}>
                {quizzes?.map((quiz) => {
                    return <QuizCard key={quiz._id} quiz={quiz} role="admin" />;
                })}
            </CardsContainer>
            {showModal.isShow && showModal.formName === "Confirmation" && (
                <Confirmation quiz={showModal.quizData as Quiz} />
            )}
        </Container>
    );
};

export default MyQuizzes;
