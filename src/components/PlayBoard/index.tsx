import { styled } from "styled-components";
import PlayBoardHeader from "./PlayBoardHeader";
import DashBoard from "../../pages/DashBoard/index";
import AnswerItem from "./AnswerItem";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem;
    height: 100%;
`;
const QuestionContainer = styled.div`
    width: 80%;
    min-height: 10rem;
    height: 12rem;
    font-size: 1.5rem;
    background-color: #7a4953;
    text-align: center;
    margin: 0 auto;
    color: #ffffff;
    padding: 2rem;
`;
const Question = styled.p`
    height: 100%;
    width: 100%;
    word-wrap: break-word;
    overflow-y: auto;
`;
const AnswerContainer = styled.div`
    display: grid;
    width: 80%;
    height: inherit;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0 auto;
    gap: 0 1rem;
`;
const PlayBoard = () => {
    return (
        <Container>
            <PlayBoardHeader duration={5} />
            <QuestionContainer>
                <Question>
                    A wealthy family lived in a big circular house. They had a
                    maid, a butler, and a gardener. The parents were going to a
                    party, so they tucked the younger kids into bed and kissed
                    them goodnight and said goodbye, and kissed the older kids
                    goodnight. When the parents came home, all the ki
                </Question>
            </QuestionContainer>
            <AnswerContainer>
                <AnswerItem backgroundColor="#ae5465"/>
                <AnswerItem backgroundColor="#2493A7"/>
                <AnswerItem backgroundColor="#469347"/>
                <AnswerItem backgroundColor="#7D60A6"/>
            </AnswerContainer>
        </Container>
    );
};

export default PlayBoard;
