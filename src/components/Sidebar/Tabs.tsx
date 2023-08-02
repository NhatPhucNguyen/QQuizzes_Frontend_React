import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import DashBoard from "../../pages/DashBoard";

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const TabItem = styled.div<{ $onTab?: boolean }>`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0rem;
    background-color: ${(props) => (props.$onTab ? "#ffffff" : "#e7717d")};
    color: ${(props) => (props.$onTab ? "#e7717d" : "#ffffff")};
    &:hover {
        background-color: #ffffff;
        color: #e7717d;
        cursor: pointer;
    }
`;
const TabName = styled.span`
    font-weight: bold;
`;
const Tabs = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const noSlashPathname = pathname.replace(/\/+$/, "").toLowerCase();
    console.log(noSlashPathname);
    return (
        <TabContainer>
            <TabItem
                onClick={() => {
                    navigate("/dashboard");
                }}
                $onTab={
                    pathname.endsWith("dashboard")
                }
            >
                <TabName>DashBoard</TabName>
            </TabItem>
            <TabItem
                onClick={() => {
                    navigate("myquizzes");
                }}
                $onTab={pathname.includes("myquizzes")}
            >
                <TabName>My Quizzes</TabName>
            </TabItem>
            <TabItem
                onClick={() => {
                    console.log("Hello");
                }}
            >
                <TabName>Report</TabName>
            </TabItem>
            <TabItem
                onClick={() => {
                    console.log("Hello");
                }}
            >
                <TabName>Profile</TabName>
            </TabItem>
        </TabContainer>
    );
};

export default Tabs;
