import { Fragment, useState } from 'react';
import { styled } from "styled-components";
import { Selection } from "../../interfaces/app_interfaces";
import SelectionItem from "./SelectionItem";
import { devices } from '../../config/devices';

const AnswersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    @media screen and (${devices.phones}){
        display: flex;
        flex-direction: column;
    }
`;
const AnswersGroup = ({ selections }: { selections?: Selection[] }) => {
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
