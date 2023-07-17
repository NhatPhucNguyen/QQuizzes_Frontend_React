import { styled } from "styled-components";

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
    return (
        <TabContainer>
            <TabItem
                onClick={() => {
                    console.log("Hello");
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
