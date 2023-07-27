import { styled } from "styled-components";
import { devices } from "../../utils/devices";
import Tabs from "./Tabs";
import { customAxios } from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

type CustomProps = {
    openModal: (formName:string) => void;
};

const SideContainer = styled.nav`
    height: 100%;
    width: 100%;
    background-color: #e7717d;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: #ffffff;
    align-items: center;
    padding-bottom: 0.5rem;
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
`;
const LogoutButton = styled(CreateButton)`
    margin-top: auto;
    border: 2px solid #ffffff;
    background-color: #e7717d;
    color: #ffffff;
`;
const Sidebar = (props: CustomProps) => {
    const navigate = useNavigate();
    return (
        <SideContainer>
            <LogoContainer>
                <Link href="/dashboard">
                    <Logo src="/logo3.png" />
                </Link>
            </LogoContainer>
            <UserSummary>Hello, {localStorage.getItem("fullName")}</UserSummary>
            <CreateButton onClick={()=> props.openModal("CollectionCreate")}>Create</CreateButton>
            <Tabs />
            <LogoutButton
                onClick={() => {
                    const logout = async () => {
                        await customAxios.get("/auth/logout");
                        localStorage.clear();
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
