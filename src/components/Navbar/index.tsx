import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import { devices } from "../../utils/devices";

const NavContainer = styled.nav`
    width: 100%;
    background-color: #e7717d;
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    justify-content: space-between;
`;
const Logo = styled.img`
    width: 8rem;
    @media only screen and (${devices.phones}) {
        width: 6rem;
    }
`;
const Navbar = () => {
    return (
        <NavContainer>
            <Logo src="logo3.png" />
            <ButtonContainer />
        </NavContainer>
    );
};

export default Navbar;
