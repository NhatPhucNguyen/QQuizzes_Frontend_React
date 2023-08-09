import { Fragment, useState } from 'react';
import { styled } from "styled-components";
import { ISelection } from "../../interfaces/app_interfaces";
import SelectionItem from "./SelectionItem";

const AnswersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    width: 100%;
`;
const AnswersGroup = ({ selections }: { selections?: ISelection[] }) => {
    const [isRefresh, setIsRefresh] = useState(false);
    return (
        <AnswersContainer>
            {selections ? (
                <Fragment>
                    {selections.map((selection, index) => {
                        return (
                            <SelectionItem
                                setIsRefresh={setIsRefresh}
                                isRefresh={isRefresh}
                                radioIndex={index}
                                desc={selection.desc}
                                isTrue={selection.isTrue}
                                key={index}
                            />
                        );
                    })}
                </Fragment>
            ) : (
                <Fragment>
                    <SelectionItem
                        setIsRefresh={setIsRefresh}
                        isRefresh={isRefresh}
                        radioIndex={0}
                    />
                    <SelectionItem
                        setIsRefresh={setIsRefresh}
                        isRefresh={isRefresh}
                        radioIndex={1}
                    />
                    <SelectionItem
                        setIsRefresh={setIsRefresh}
                        isRefresh={isRefresh}
                        radioIndex={2}
                    />
                    <SelectionItem
                        setIsRefresh={setIsRefresh}
                        isRefresh={isRefresh}
                        radioIndex={3}
                    />
                </Fragment>
            )}
        </AnswersContainer>
    );
};

export default AnswersGroup;
