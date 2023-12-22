import styled from "styled-components";
import { usePlayBoardContext } from "../../context/PlayBoardContext";
import AnswerItem from "./AnswerItem";
import { devices } from "../../config/devices";

const AnswerContainer = styled.div`
    display: grid;
    width: 80%;
    height: inherit;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0 auto;
    gap: 1rem;
    @media screen and (${devices.tablets}){
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;

const backgroundColors = ["#c88c02", "#2493A7", "#92af00", "#7D60A6"];

const PlayBoardAnswers = () => {
    const { question } = usePlayBoardContext();
    return (
        <AnswerContainer>
            {question.selections.map((selection) => {
                return (
                    <AnswerItem
                        key={selection.selectionNumber}
                        backgroundColor={
                            backgroundColors[selection.selectionNumber]
                        }
                        desc={selection.desc}
                        isTrue={selection.isTrue}
                    />
                );
            })}
        </AnswerContainer>
    );
};

export default PlayBoardAnswers;
