import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import { IQuiz } from "../../interfaces/app_interfaces";

const Container = styled.div`
    width: 100%;
    background-color: #a8525b;
`;
const Start = styled.div`
    font-size: 1rem;
    padding: 1rem 3rem 1rem 1rem;
    background-color: #693339;
    font-family: inherit;
    color: #ffffff;
    &::placeholder {
        color: #c9c9c9;
    }
    color: #aae87d;
    width: max-content;
    max-width: 100%;

    text-align: center;
`;
const Text = styled.span`
    margin-left: 1rem;
`;
const SubNav = () => {
    const quizData = useLoaderData() as IQuiz;
    const quizName =
        quizData.quizName.length > 30
            ? quizData.quizName.slice(0, 30) + "..."
            : quizData.quizName;
    return (
        <Container id="subNav">
            <Start>
                <FontAwesomeIcon icon={faClipboardList} size="xl" />
                <Text>{quizName}</Text>
            </Start>
        </Container>
    );
};

export default SubNav;
