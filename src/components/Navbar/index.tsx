import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import { devices } from "../../utils/devices";

type navProps = {
    isHideButtons?: boolean;
};

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
const Link = styled.a`
    &:hover{
        cursor: pointer;
    }
`;
const Navbar = (props: navProps) => {
    return (
        <NavContainer>
            <Link href="/">
                <Logo src="logo3.png"/>
            </Link>
            {!props.isHideButtons && <ButtonContainer />}
        </NavContainer>
    );
};

export default Navbar;
