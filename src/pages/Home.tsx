import { styled } from "styled-components";
import Layout from "../components/Layout";
import Introduction from "../components/Introduction";
import { devices } from "../utils/devices";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 4em;
    height: inherit;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    @media only screen and (${devices.tablets}) {
        flex-direction: column;
    }
`;
const CreateButton = styled.button`
    border: 2px solid #989898;
    border-bottom: 8px solid #989898;
    background-color: #ffffff;
    width: 18rem;
    height: 5rem;
    color: #e7717d;
    font-size: 1.8rem;
    padding: 1rem 2rem;
    font-family: inherit;
    font-weight: bold;
    border-radius: 25px;
    transition: all 0.4s ease-in-out;
    &:hover {
        transform: translateY(6px);
        border-bottom: 2px solid #989898;
        cursor: pointer;
    }
`;
const JoinGameButton = styled(CreateButton)`
    color: #ffffff;
    background-color: #7e685a;
`;
const Home = () => {
    return (
        <Layout>
            <Container>
                <Introduction />
                <ButtonContainer>
                    <CreateButton>Create quizzes</CreateButton>
                    <JoinGameButton>Join a game</JoinGameButton>
                </ButtonContainer>
            </Container>
        </Layout>
    );
};

export default Home;
