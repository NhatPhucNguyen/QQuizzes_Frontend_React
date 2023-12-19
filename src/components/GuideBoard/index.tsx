import { useEffect, useState } from "react";
import {
    useLoaderData,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../Layout/ModalLayout";
import { customAxios } from "../../config/axiosConfig";
import { IAttempt, IQuestion, IQuiz } from "../../interfaces/app_interfaces";
import { questionsTotalCalculate } from "../../utils/questionsTotalCalculate";
import DetailItem from "./DetailItem";
import RuleInfo from "./RuleInfo";

const moveDown = keyframes`
    from{
        opacity: 0;
        transform: translateY(-30px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    background-color: #ffffff;
    padding: 1rem 2rem;
    border: solid 5px #e7717d;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 15px;
    animation: ${moveDown} 0.4s ease-in-out;
`;
const Header = styled.div``;
const Main = styled.div`
    background-color: rgb(237, 53, 53, 0.3);
    width: fit-content;
    margin: auto;
    padding: 0.5rem 1rem;
    border-radius: 15px;
`;
const Title = styled.h2`
    text-align: center;
    color: #73a64e;
`;
const Topic = styled.h3`
    text-align: center;
    color: #f2b84b;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
const Button = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: inherit;
    font-weight: bold;
    color: #ffffff;
    &:hover {
        cursor: pointer;
    }
`;
const PlayButton = styled(Button)`
    background-color: #73a64e;
    &:hover {
        background-color: #558534;
    }
`;
const BackButton = styled(Button)`
    background-color: #e1a22d;
    &:hover {
        background-color: #c58b1f;
    }
`;
const GuideBoard = ({ allowedToPlay }: { allowedToPlay: () => void }) => {
    const [quiz, setQuiz] = useState({} as IQuiz);
    const [searchParams] = useSearchParams();
    const [attempts, setAttempts] = useState<IAttempt[]>([]);
    const navigate = useNavigate();
    const { quizId } = useParams();
    const questions = useLoaderData() as IQuestion[];
    const { totalPoints, timeConverted } = questionsTotalCalculate(questions);
    const highestScore = Math.max(...attempts.map((attempts) => {
        return attempts.point;
    }));
    useEffect(() => {
        const getSingleQuiz = async () => {
            try {
                const response = await customAxios.get(
                    `/quizzes/${quizId as string}`
                );
                if (response.status === 200) {
                    const quizData = response.data as IQuiz;
                    setQuiz(quizData);
                }
            } catch (error) {
                navigate(-1);
            }
        };
        const getPlayerAttempt = async () => {
            try {
                const response = await customAxios.get(
                    `/quizzes/${quizId as string}/play/attempts`
                );
                if (response.status === 200) {
                    const { attempts } = response.data as {
                        attempts: IAttempt[];
                    };
                    setAttempts(attempts);
                }
            } catch (error) {
                console.log(error);
                navigate(-1);
            }
        };
        void getSingleQuiz();
        if (searchParams.get("type") !== "preview") {
            void getPlayerAttempt();
        }
    }, []);
    return (
        <Modal>
            <Container>
                <Header>
                    <Title>{quiz.quizName}</Title>
                    <Topic>Topic: {quiz.topic}</Topic>
                </Header>
                <Main>
                    <DetailItem
                        field="Questions"
                        detail={quiz.quantity as number}
                    />
                    <DetailItem field="Level" detail={quiz.level} />
                    <DetailItem
                        field="Total point"
                        detail={totalPoints.toString()}
                    />
                    <DetailItem field="Time limit" detail={timeConverted} />
                    <DetailItem
                        field="Attempts"
                        detail={`${attempts.length}/unlimited`}
                    />
                    {attempts.length > 0 && <DetailItem field="Highest Point" detail={highestScore}/>}
                </Main>
                <RuleInfo />
                <ButtonContainer>
                    <PlayButton
                        onClick={() => {
                            allowedToPlay();
                        }}
                    >
                        Play
                    </PlayButton>
                    <BackButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back
                    </BackButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
};

export default GuideBoard;
