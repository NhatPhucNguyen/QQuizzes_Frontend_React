import { styled } from "styled-components";

const AlertContainer = styled.div`
    background-color: rgb(250, 80, 97, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 50px;
`;
const Message = styled.span`
    font-size: 0.8rem;
    font-family: inherit;
`;
export const AlertBar = ({ message }: { message: string }) => {
    return (
        <AlertContainer role="alert-message">
            <Message>{message}</Message>
        </AlertContainer>
    );
};

export default AlertBar;
