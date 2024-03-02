import { useCallback } from "react";
import { useQueries } from "react-query";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

import { getPrivateQuizzes, getQuizzesParticipated } from "../../apis/QuizAPI";
import Confirmation from "../../components/Confirmation";
import MyQuizzesSidebar from "../../components/MyQuizzesSidebar";
import NotificationBar from "../../components/NotificationBar";
import QuizCard from "../../components/QuizCard";
import { devices } from "../../config/devices";
import { useModalContext } from "../../context/ModalContext";
import { Quiz } from "../../interfaces/app_interfaces";

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 1rem;
  @media screen and (${devices.tablets}) {
    display: block;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  width: 100%;
  overflow: visible;
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 17rem);
  gap: 1rem;
  margin-left: 1rem;
  @media screen and (${devices.laptops}) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 1rem;
  }
  @media screen and (${devices.tablets}) {
    grid-template-columns: repeat(2, 50%);
  }
  @media screen and (${devices.phones}) {
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
  }
`;
type SearchType = "createdByMe" | "previouslyPlayed" | "allMyContent" | null;
const MyQuizzes = () => {
  const { showModal, notification } = useModalContext();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as SearchType;
  const userId = localStorage.getItem("userId");
  const [{ data: quizzesParticipated }, { data: privateQuizzes }] = useQueries([
    { queryFn: getQuizzesParticipated, queryKey: ["quizzesParticipated"] },
    { queryFn: getPrivateQuizzes, queryKey: ["myQuizzes"] },
  ]);
  const renderQuizzes = useCallback(() => {
    switch (type) {
      case "createdByMe":
        return privateQuizzes?.map((quiz) => {
          return <QuizCard key={quiz._id} quiz={quiz} role="admin" />;
        });
      case "previouslyPlayed":
        return quizzesParticipated?.map((quiz) => {
          return <QuizCard key={quiz._id} quiz={quiz} />;
        });
      default:
        return quizzesParticipated?.concat(privateQuizzes || []).map((quiz) => {
          return (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              role={quiz.userId === userId ? "admin" : undefined}
            />
          );
        });
    }
  }, [privateQuizzes, quizzesParticipated, type, userId]);
  return (
    <Container>
      <MyQuizzesSidebar />
      <RightContainer>
        {notification.isShow && (
          <NotificationBar message={notification.message} />
        )}
        <CardsContainer key={showModal.formName}>
          {renderQuizzes()}
        </CardsContainer>
        {showModal.isShow && showModal.formName === "Confirmation" && (
          <Confirmation quiz={showModal.quizData as Quiz} />
        )}
      </RightContainer>
    </Container>
  );
};

export default MyQuizzes;
