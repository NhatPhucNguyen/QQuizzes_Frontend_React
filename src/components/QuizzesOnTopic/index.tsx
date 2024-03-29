import { Quiz } from "../../interfaces/app_interfaces";
import styled from "styled-components";
import QuizCard from "../QuizCard";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getPublicQuizzes } from "../../apis/QuizAPI";

type CustomProps = {
    topicName: string;
    mostPlayedQuizzes?: Quiz[];
};
const Container = styled.div`
    margin-top: 2rem;
`;
const Topic = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
`;
const TopicName = styled(Link)`
    color: #f29f05;
    font-size: 1.2rem;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
const QuizList = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 1rem;
`;
const QuizzesOnTopic = (props: CustomProps) => {
    const { data: quizzes } = useQuery({
        queryKey: [props.topicName],
        queryFn: () => getPublicQuizzes(`?topicName=${props.topicName}`),
    });
    return (
        <Container>
            <Topic>
                <FontAwesomeIcon icon={faStar} color="#f8d93d" />
                <TopicName to={`quizzes?topicName=${props.topicName}`}>
                    {props.topicName}
                </TopicName>
            </Topic>
            <QuizList>
                {quizzes &&
                    quizzes
                        .filter((quiz) => quiz.topic === props.topicName)
                        .slice(0, 4)
                        .map((item) => {
                            return <QuizCard quiz={item} key={item._id} />;
                        })}
            </QuizList>
        </Container>
    );
};

export default QuizzesOnTopic;
