import { keyframes, styled } from "styled-components";
import { devices } from "../../utils/devices";
import Tabs from "./Tabs";
import { customAxios } from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalOptions } from "../../interfaces/app_interfaces";

type CustomProps = {
    openModal: (options: ModalOptions) => void;
    isShowSidebar?: boolean;
    closeSidebar?: () => void;
};

const moveRightToLeft = keyframes`
    from{
        opacity: 0;
        width: 10%;
    }
    to{
        opacity: 1;
        width: 100%;
    }
`;

const SideContainer = styled.nav<{ $isShow?: boolean }>`
    height: 100%;
    width: 100%;
    background-color: #e7717d;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: #ffffff;
    align-items: center;
    padding-bottom: 0.5rem;
    position: sticky;
    top: 0;
    @media screen and (${devices.phones}) {
        display: ${(props) => (props.$isShow ? "flex" : "none")};
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        height: 100%;
        gap: 1rem;
        animation: ${moveRightToLeft} 0.4s ease-in-out;
    }
`;
const LogoContainer = styled.div`
    width: 100%;
    background-color: inherit;
    padding: 0.3rem;
`;
const Logo = styled.img`
    width: 8rem;
    @media only screen and (${devices.phones}) {
        width: 6rem;
    }
`;
const Link = styled.a`
    width: fit-content;
    &:hover {
        cursor: pointer;
    }
`;
const UserSummary = styled.span`
    padding: 0.5rem;
`;
const CreateButton = styled.button`
    width: 80%;
    padding: 0.5rem 0rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-family: inherit;
    font-weight: bolder;
    background-color: inherit;
    color: #e7717d;
    background-color: #ffffff;
    &:hover {
        cursor: pointer;
    }
    @media screen and (${devices.phones}) {
        width: 50%;
    }
`;
const LogoutButton = styled(CreateButton)`
    margin-top: auto;
    border: 2px solid #ffffff;
    background-color: #e7717d;
    color: #ffffff;
`;
const Start = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
const IconWrapper = styled.div`
    display: none;
    @media screen and (${devices.phones}) {
        display: block;
        padding: 0.5rem 0.5rem 0 0;
    }
`;
const Sidebar = (props: CustomProps) => {
    const navigate = useNavigate();
    return (
        <SideContainer $isShow={props.isShowSidebar}>
            <Start>
                <LogoContainer>
                    <Link href="/dashboard">
                        <Logo src="/logo3.png" />
                    </Link>
                </LogoContainer>
                <IconWrapper
                    onClick={() => {
                        props.closeSidebar && props.closeSidebar();
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                </IconWrapper>
            </Start>

            <UserSummary>Hello, {localStorage.getItem("fullName")}</UserSummary>
            <CreateButton
                onClick={() => props.openModal({ formName: "QuizCreate" })}
            >
                Create
            </CreateButton>
            <Tabs />
            <LogoutButton
                onClick={() => {
                    const logout = async () => {
                        localStorage.clear();
                        await customAxios.get("/auth/logout");
                        navigate("/");
                    };
                    void logout();
                }}
            >
                Logout
            </LogoutButton>
        </SideContainer>
    );
};

export default Sidebar;
