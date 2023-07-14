import { styled } from "styled-components";

const AlertContainer = styled.div`
    background-color: rgb(250, 80, 97, 0.5);
    padding: 0.5rem;
    border-radius: 50px;
`;
const Message = styled.span`
    font-size: 0.8rem;
    font-family: inherit;
`;
const Alert = ({ message }: { message: string }) => {
    return (
        <AlertContainer>
            <Message>{message}</Message>
        </AlertContainer>
    );
};

export default Alert;
