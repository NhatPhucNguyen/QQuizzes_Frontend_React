import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
`;
const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default Layout;
