import {
    useLoaderData,
    useNavigate
} from "react-router-dom";
import { keyframes, styled } from "styled-components";
import Modal from "../../layout/ModalLayout";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import {
    IPlayer
} from "../../interfaces/app_interfaces";
import timeToString from "../../utils/timeToString";
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
    const { quiz } = usePlayBoardContext();
    const navigate = useNavigate();
    const { player } = useLoaderData() as { player?: IPlayer };
    const timeConverted = timeToString(quiz.timeLimit);
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
                        detail={quiz.quantity}
                    />
                    <DetailItem field="Level" detail={quiz.level} />
                    <DetailItem field="Total point" detail={`${quiz.totalPoints}pts`} />
                    <DetailItem field="Time limit" detail={timeConverted} />
                    <DetailItem
                        field="Attempts"
                        detail={`${
                            player?.result && player?.result.attempts
                                ? player.result.attempts
                                : 0
                        }/unlimited`}
                    />
                    {player?.result && (
                        <DetailItem
                            field="Highest Point"
                            detail={`${player.result.highestPoint}pts`}
                        />
                    )}
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
