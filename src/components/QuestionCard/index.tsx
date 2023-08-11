import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { IQuestion } from "../../interfaces/app_interfaces";
import BodyQuestionCard from "./BodyQuestionCard";
import FooterQuestionCard from "./FooterQuestionCard";
import { devices } from "../../utils/devices";

type CustomProps = {
    question: IQuestion;
};

const Container = styled.div`
    width: 90%;
    border-radius: 10px;
    border: 2px solid #a1acb3;
`;
const Head = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #e6e6e6;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0.5rem;
`;
const QuestionNumber = styled.span`
    padding: 0.5rem 0;
`;
const RuleContainer = styled.div`
    width: 40%;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: 1rem;
`;
const Point = styled.span`
    background-color: #bfbfbf;
    min-width: 4rem;
    text-align: center;
    padding: 0.5rem 0;
`;
const TimeLimit = styled.span`
    background-color: #bfbfbf;
    min-width: 4rem;
    text-align: center;
    padding: 0.5rem 0;
`;
const QuestionCard = (props: CustomProps) => {
    return (
        <Container>
            <Head>
                <QuestionNumber>
                    {props.question.questionNumber &&
                        `Question ${props.question.questionNumber.toString()}`}
                </QuestionNumber>
                <RuleContainer>
                    <Point>
                        <FontAwesomeIcon
                            icon={faStar}
                            size="xs"
                            color="#ffffff"
                        />{" "}
                        {`${props.question.point} pts`}
                    </Point>
                    <TimeLimit>
                        <FontAwesomeIcon
                            icon={faClock}
                            size="xs"
                            color="#ffffff"
                        />{" "}
                        {props.question.timeLimit.toString() + "s"}
                    </TimeLimit>
                </RuleContainer>
            </Head>
            <BodyQuestionCard
                question={props.question.question}
                selections={props.question.selections}
            />
            <FooterQuestionCard questionData={props.question}/>
        </Container>
    );
};

export default QuestionCard;
