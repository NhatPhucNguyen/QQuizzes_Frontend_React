import styled from "styled-components";
import { devices } from "../../config/devices";
import ButtonContainer from "./ButtonContainer";
import HamburgerMenu from "./HamburgerMenu";

type navProps = {
    isHideButtons?: boolean;
    isHideLogo?: boolean;
    height?: string;
    isShowBurgerBar?: boolean;
};

const NavContainer = styled.nav<{ $height?: string }>`
    width: 100%;
    min-height: ${(props) => props.$height || "auto"};
    background-color: #e7717d;
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    justify-content: space-between;
`;
const Logo = styled.img`
    width: 8rem;
    @media screen and (${devices.phones}) {
        width: 6rem;
    }
`;
const Link = styled.a`
    &:hover {
        cursor: pointer;
    }
`;
const Navbar = (props: navProps) => {
    return (
        <NavContainer $height={props.height}>
            <Link href="/">
                <Logo src="/logo3.png" />
            </Link>
            {props.isShowBurgerBar ? (
                <HamburgerMenu />
            ) : (
                !props.isHideButtons && <ButtonContainer />
            )}
        </NavContainer>
    );
};

export default Navbar;
