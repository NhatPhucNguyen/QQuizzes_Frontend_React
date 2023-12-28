import { faPen, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { IQuiz, ModalContext } from "../../interfaces/app_interfaces";
import { devices } from "../../config/devices";
import { btnColorGenerate, levelColorText } from "../../utils/stylingMethod";

type CustomProps = {
    quiz: IQuiz;
    role?: string;
};

const Container = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const QuizName = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    @media screen and (${devices.phones}) {
        font-size: 1rem;
    }
`;

const Topic = styled.span`
    font-size: 1rem;
    text-align: center;
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
`;
const Quantity = styled.span`
    font-size: 0.8rem;
`;
const Plays = styled(Quantity)``;
const Level = styled.span<{ $level?: string }>`
    font-size: 0.8rem;
    font-weight: bold;
    color: ${(props) => levelColorText(props.$level)};
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 2.5rem;
    width: 100%;
    margin-top: 1rem;
`;

const Button = styled.button<{ $method?: string }>`
    padding: 0.2rem 1rem;
    font-size: inherit;
    font-family: inherit;
    border: none;
    background-color: inherit;
    color: ${(props) => btnColorGenerate(props.$method)};
    outline: 2px solid ${(props) => btnColorGenerate(props.$method)};
    &:hover {
        cursor: pointer;
        background-color: ${(props) => btnColorGenerate(props.$method)};
        color: #ffffff;
    }
    @media screen and (${devices.phones}) {
        padding: 0.2rem;
    }
`;

const QuizCard = ({ quiz, role }: CustomProps) => {
    const navigate = useNavigate();
    const outletContext = useOutletContext<ModalContext>();
    const handleDeleteClick = () => {
        outletContext.openModal({ formName: "Confirmation", quizData: quiz });
    };
    return (
        <Container>
            <QuizName>
                {quiz.quizName.length > 20
                    ? quiz.quizName.slice(0, 20) + "..."
                    : quiz.quizName}
            </QuizName>
            <Topic>{quiz.topic || " "}</Topic>
            <SubContainer>
                <Quantity>
                    {quiz.quantity
                        ? `${quiz.quantity} questions`
                        : `0 questions`}{" "}
                </Quantity>
                <Level $level={quiz.level}>{quiz.level || " "}</Level>
            </SubContainer>
            <SubContainer>
                <Plays>
                    {quiz.numberOfPlays} plays
                </Plays>
            </SubContainer>
            {role === "admin" ? (
                <ButtonContainer>
                    <Button
                        onClick={() => {
                            //navigate to list of questions
                            navigate(
                                `/admin/quizzes/${quiz._id as string}/questions`
                            );
                        }}
                        $method="edit"
                    >
                        <FontAwesomeIcon icon={faPen} /> Edit
                    </Button>
                    <Button onClick={handleDeleteClick} $method="delete">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                </ButtonContainer>
            ) : (
                <ButtonContainer>
                    <Button
                        onClick={() => {
                            navigate(`/play/${quiz._id as string}`);
                        }}
                        $method="play"
                    >
                        <FontAwesomeIcon icon={faPlay} /> Play
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
};

export default QuizCard;
