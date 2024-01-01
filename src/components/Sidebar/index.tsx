import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import { customAxios } from "../../config/axiosConfig";
import { useSidebarContext } from "../../context/SidebarContext";
import { ModalOptions } from "../../interfaces/app_interfaces";
import { devices } from "../../config/devices";
import Tabs from "./Tabs";

type CustomProps = {
    openModal: (options: ModalOptions) => void;
};

const moveRightToLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(100px);
    }
    to{
        opacity: 1;
        transform: translateX(0);
    }
`;

const SideContainer = styled.nav<{ $isShow?: boolean }>`
    height: 100%;
    width: 100%;
    background-color: #e7717d;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
        width: 70%;
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
        background-color: #e7717d;
        color: #ffffff;
        outline: 2px solid #ffffff;
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
    &:hover {
        background-color: #ffffff;
        color: #e7717d;
        outline: none;
    }
`;
const Start = styled.div`
    text-align: end;
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
    const sideBarContext = useSidebarContext();
    return (
        <SideContainer $isShow={sideBarContext.isShowSidebar}>
            <Start>
                <IconWrapper
                    onClick={() => {
                        sideBarContext.closeSidebar();
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
                        const response = await customAxios.get("/auth/logout");
                        if (response.status == 204) {
                            localStorage.clear();
                            navigate("/");
                        }
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
