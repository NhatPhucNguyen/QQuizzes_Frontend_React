import { styled } from "styled-components";
import {
    faClipboardList,
    faIndent,
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CustomProps = {
    isShowQuestNum?:boolean
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    gap: 1rem;
`;
const Start = styled.div`
    width: 100%;
`;
const Mid = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const End = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
`;
const Text = styled.span``;
const SubNav = (props:CustomProps) => {
    return (
        <Container>
            <Start>
                <ContentWrapper>
                    <FontAwesomeIcon icon={faClipboardList} size="xl" />
                    <Text>Quiz Name</Text>
                </ContentWrapper>
            </Start>
            <Mid>
                {props.isShowQuestNum && <ContentWrapper>
                    <FontAwesomeIcon icon={faIndent} size="xl" />
                    <Text>Question Number</Text>
                </ContentWrapper>}
            </Mid>
            <End>
                <ContentWrapper>
                    <FontAwesomeIcon icon={faListCheck} size="xl" />
                    <Text>Quiz Type</Text>
                </ContentWrapper>
            </End>
        </Container>
    );
};

export default SubNav;
