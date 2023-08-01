import {
    faMagnifyingGlass,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    height: inherit;
    font-weight: bold;
    position: relative;
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-family: "Lumanosimo", cursive;
    color: #86a69d;
`;
const SubTitle = styled(Title)`
    color: #f2b263;
`;
const SearchBoxContainer = styled.form`
    width: 45rem;
    border-radius: 50px;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 80% 20%;
    justify-content: flex-end;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const SearchBox = styled.input`
    width: 100%;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
`;
const SearchButton = styled.button`
    border: none;
    outline: none;
    border-radius: 0 50px 50px 0;
    width: 100%;
    font-size: 1rem;
    background-color: #bf7e78;
    color: #f2e4dc;
    &:hover {
        cursor: pointer;
    }
`;
const JoinContainer = styled(SearchBoxContainer)`
    width: 30rem;
`;

const InitialContent = () => {
    return (
        <Container>
            <Title>What are you looking for today ?</Title>
            <SearchBoxContainer>
                <SearchBox
                    type="text"
                    placeholder="Search for quizzes on any topic"
                />
                <SearchButton>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </SearchButton>
            </SearchBoxContainer>
            <SubTitle>Or Join a game ?</SubTitle>
            <JoinContainer>
                <SearchBox type="text" placeholder="Enter code" />
                <SearchButton>
                    <FontAwesomeIcon icon={faRightToBracket} size="2xl" />
                </SearchButton>
            </JoinContainer>
        </Container>
    );
};

export default InitialContent;
