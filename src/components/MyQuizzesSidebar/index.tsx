import { MouseEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: inherit;
    background-color: inherit;
`;
const Heading = styled.h3``;
const TabsContainer = styled.div`
    margin-top: 1rem;
`;
const TabItem = styled.div<{ $active?: boolean }>`
    width: 100%;
    padding: 0.5rem 0.5rem;
    margin-bottom: 0.4rem;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => (props.$active ? "#ffffff" : "inherit")};
    color: ${(props) => (props.$active ? "#000000" : "#61605f")};
    box-shadow: ${(props) =>
        props.$active ? "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" : "none"};
    &:hover {
        cursor: pointer;
        background-color: #ffffff;
        color: #000000;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
`;
const MyQuizzesSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    const tabs = ["createdByMe", "previouslyPlayed", "allMyContent"];
    const handleTabClick = (e: MouseEvent<HTMLDivElement>) => {
        setSearchParams((prev) => {
            prev.set("type", e.currentTarget.id);
            return prev;
        });
    };
    useEffect(() => {
        if (!type || !tabs.includes(type)) {
            setSearchParams((prev) => {
                prev.set("type", "createdByMe");
                return prev;
            });
        }
    }, [searchParams]);
    return (
        <Container>
            <Heading>My Quizzes</Heading>
            <TabsContainer>
                <TabItem
                    $active={type === "createdByMe"}
                    id="createdByMe"
                    onClick={handleTabClick}
                >
                    Created by me
                </TabItem>
                <TabItem
                    $active={type === "previouslyPlayed"}
                    id="previouslyPlayed"
                    onClick={handleTabClick}
                >
                    Previously played
                </TabItem>
                <TabItem
                    $active={type === "allMyContent"}
                    id="allMyContent"
                    onClick={handleTabClick}
                >
                    All my content
                </TabItem>
            </TabsContainer>
        </Container>
    );
};

export default MyQuizzesSidebar;
