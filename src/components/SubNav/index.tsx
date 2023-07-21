import { styled } from "styled-components";
import QuestionSelection, {
    QuestionNumber,
    QuestionNumberContainer,
} from "./QuestionSelection";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    background-color: #a8404b;
`;
const CollectionName = styled.input`
    font-size: 1rem;
    padding: 1rem 0.5rem;
    background-color: #844349;
    border: none;
    outline: none;
    width: 50%;
    font-family: inherit;
    color: #ffffff;
    &::placeholder {
        color: #c9c9c9;
    }
`;
const LimitContainer = styled(QuestionNumberContainer)`
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-end;
    padding-right: 0.2rem;
`;
const Point = styled(QuestionNumber)`
    width: 30%;
`;
const TimeLimit = styled(QuestionNumber)`
    width: 30%;
`;
const SubNav = () => {
    const { register } = useFormContext();
    const {collectionName} = useParams();
    return (
        <Container>
            <CollectionName
                name="collection"
                type="text"
                value={collectionName}
                readOnly
            />
            <QuestionSelection />
            <LimitContainer>
                <Point defaultValue={1} {...register("point")}>
                    <option value={1}>1 pts</option>
                    <option value={2}>2 pts</option>
                    <option value={3}>3 pts</option>
                </Point>
                <TimeLimit defaultValue={30} {...register("timeLimit")}>
                    <option value={30}>30s</option>
                    <option value={45}>45s</option>
                    <option value={60}>60s</option>
                </TimeLimit>
            </LimitContainer>
        </Container>
    );
};

export default SubNav;
