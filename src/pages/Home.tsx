import { styled } from "styled-components";
import Introduction from "../components/Introduction";
import { devices } from "../utils/devices";
import Navbar from "../components/Navbar";
import { faPlus, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Main from "../Layout/Main";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 4em;
    height: inherit;
    @media only screen and (${devices.phones}) {
        gap: 2rem;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    @media only screen and (${devices.tablets}) {
        flex-direction: row;
    }
`;
const CreateButton = styled.button`
    border: 2px solid #bc2445;
    border-bottom: 8px solid #bc2445;
    background-color: #d2284d;
    color: #ffffff;
    width: 20rem;
    height: 5rem;
    font-size: 1.8rem;
    padding: 1rem 2rem;
    font-family: inherit;
    font-weight: bold;
    border-radius: 25px;
    transition: all 0.4s ease-in-out;
    &:hover {
        transform: translateY(6px);
        border-bottom: 2px solid #bc2445;
        cursor: pointer;
    }
    @media only screen and (${devices.phones}) {
        font-size: 1.2rem;
        width: 9rem;
        padding: 0.2rem;
    }
`;
const JoinGameButton = styled(CreateButton)`
    color: #000000;
    background-color: #f2bac6;
`;


const Home = () => {
    return (
        <Main>
            <Navbar />
            <Container>
                <Introduction />
                <ButtonContainer>
                    <CreateButton>
                        Create quizzes <FontAwesomeIcon icon={faPlus} />
                    </CreateButton>
                    <JoinGameButton>
                        Join a game <FontAwesomeIcon icon={faRightToBracket} />
                    </JoinGameButton>
                </ButtonContainer>
            </Container>
        </Main>
    );
};

export default Home;
