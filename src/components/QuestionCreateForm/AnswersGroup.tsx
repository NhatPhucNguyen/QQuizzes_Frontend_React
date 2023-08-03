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
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh}/>
            <SelectionItem setIsRefresh={setIsRefresh} isRefresh={isRefresh}/>
        </AnswersContainer>
    );
};

export default AnswersGroup;
