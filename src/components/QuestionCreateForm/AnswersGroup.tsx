import { styled } from "styled-components";
import SelectionItem from "./SelectionItem";
import { useState } from "react";

const AnswersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    width: 70%;
`;
const AnswersGroup = () => {
    const [isRefresh, setIsRefresh] = useState(false);
    return (
        <AnswersContainer>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh} radioIndex={0}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh} radioIndex={1}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh} radioIndex={2}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh} radioIndex={3}/>
        </AnswersContainer>
    );
};

export default AnswersGroup;
