import { styled } from "styled-components";
import Navbar from "../Navbar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: inherit;
`;
const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Container>
            <Navbar />
            {children}
        </Container>
    );
};

export default Layout;
