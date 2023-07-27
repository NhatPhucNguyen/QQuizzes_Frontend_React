import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import DashBoard from '../../pages/DashBoard';

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const TabItem = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0rem;
    background-color: #e7717d;
    color: #ffffff;
    &:hover {
        background-color: #ffffff;
        color: #e7717d;
        cursor: pointer;
    }
`;
const Tabs = () => {
    const navigate = useNavigate();
    return (
        <TabContainer>
            <TabItem onClick={()=>{
                navigate("/dashboard")
            }}>
                <span>DashBoard</span>
            </TabItem>
            <TabItem
                onClick={() => {
                    navigate("myCollection")
                }}
            >
                <span>My Collections</span>
            </TabItem>
            <TabItem
                onClick={() => {
                    console.log("Hello");
                }}
            >
                <span>Report</span>
            </TabItem>
            <TabItem
                onClick={() => {
                    console.log("Hello");
                }}
            >
                <span>Profile</span>
            </TabItem>
        </TabContainer>
    );
};

export default Tabs;
