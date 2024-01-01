import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useSidebarContext } from "../../context/SidebarContext";

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const TabLink = styled(NavLink)`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0rem;
    background-color: #e7717d;
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        background-color: #ffffff;
        color: #e7717d;
        cursor: pointer;
    }
    &.active {
        background-color: #ffffff;
        color: #e7717d;
    }
`;
const Tabs = () => {
    const sidebarContext = useSidebarContext();
    return (
        <TabContainer>
            <TabLink
                to={"/dashboard"}
                onClick={() => {
                    sidebarContext.closeSidebar();
                }}
                end
            >
                DashBoard
            </TabLink>
            <TabLink
                to={"/dashboard/admin/quizzes"}
                onClick={() => {
                    sidebarContext.closeSidebar();
                }}
            >
                My Quizzes
            </TabLink>
            <TabLink
                to={"/dashboard/quizzes"}
                onClick={() => {
                    sidebarContext.closeSidebar();
                }}
            >
                Explore
            </TabLink>
        </TabContainer>
    );
};

export default Tabs;
