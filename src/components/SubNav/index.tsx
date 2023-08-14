import { styled } from "styled-components";
import {
    faClipboardList,
    faIndent,
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import { IQuiz } from "../../interfaces/app_interfaces";
import { devices } from "../../utils/devices";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    background-color: #a8525b;
`;
const ContentWrapper = styled.div`
    font-size: 1rem;
    padding: 1rem 0;
    background-color: #693339;
    border: none;
    outline: none;
    width: 50%;
    height: 100%;
    font-family: inherit;
    color: #ffffff;
    &::placeholder {
        color: #c9c9c9;
    }
    text-align: center;
    color: #aae87d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    @media screen and (${devices.phones}){
        width: 70%;
    }
`;
const Start = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`;
const End = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
`;
const Text = styled.span``;
const SubNav = () => {
    const quizData = useLoaderData() as IQuiz;
    return (
        <Container id="subNav">
            <Start>
                <ContentWrapper>
                    <FontAwesomeIcon icon={faClipboardList} size="xl" />
                    <Text>{quizData.quizName}</Text>
                </ContentWrapper>
            </Start>
            <End>
                <ContentWrapper>
                    <FontAwesomeIcon icon={faListCheck} size="xl" />
                    <Text>Multiple Choice</Text>
                </ContentWrapper>
            </End>
        </Container>
    );
};

export default SubNav;
