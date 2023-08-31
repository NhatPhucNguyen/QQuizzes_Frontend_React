import {
    faMagnifyingGlass,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { devices } from "../../utils/devices";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 1rem;
    width: 100%;
    height: 100%;
    @media screen and (${devices.phones}){
        font-size: 1rem;
    }
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-family: "Lumanosimo", cursive;
    color: #86a69d;
    text-align: center;
    @media screen and (${devices.phones}){
        font-size: 1.5rem;
    }
    @media screen and (${devices.tablets}){
        font-size: 2.5rem;
    }
`;
const SubTitle = styled(Title)`
    color: #f2b263;
`;
const SearchBoxContainer = styled.form`
    width: 80%;
    border-radius: 50px;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 80% 20%;
    justify-content: flex-end;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    @media screen and (${devices.phones}){
        width: 100%;
    }
`;

const SearchBox = styled.input`
    width: 100%;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    @media screen and (${devices.phones}){
        font-size: 1rem;
        &::placeholder{
            font-size: 0.8rem;
        }
    }
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
    width: 70%;
    @media screen and (${devices.phones}){
        width: 90%;
    }
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
