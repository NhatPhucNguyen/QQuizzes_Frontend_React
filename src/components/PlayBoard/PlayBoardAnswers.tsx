import styled from "styled-components";
import AnswerItem from "./AnswerItem";
import { ISelection } from "../../interfaces/app_interfaces";

const AnswerContainer = styled.div`
    display: grid;
    width: 80%;
    height: inherit;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0 auto;
    gap: 1rem;
`;

const backgroundColors = ["#c88c02", "#2493A7", "#c63535", "#7D60A6"];

type CustomProps = {
    selections: ISelection[];
};

const PlayBoardAnswers = ({ selections}: CustomProps) => {
    return (
        <AnswerContainer>
            {selections.map((selection) => {
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
