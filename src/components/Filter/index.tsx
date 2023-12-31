import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { topicSelections } from "../../config/topicSelections";
import { devices } from "../../config/devices";
const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateX(50px);
    }to{
        opacity: 1;
        transform: translateX(0);
    }
`;
const Container = styled.div<{ $show: boolean }>`
    width: 80%;
    margin: auto;
    border-radius: 15px;
    font-size: 0.8em;
    background-color: #ffffff;
    @media screen and (${devices.tablets}) {
        display: ${(props) => (props.$show ? "block" : "none")};
        animation: ${fadeIn} 0.4s ease-in-out;
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        height: 100%;
        z-index: 1;
        border-radius: 0;
    }
    @media screen and (${devices.phones}) {
        width: 100%;
    }
`;
const Header = styled.div`
    width: 100%;
    background-color: #a8485c;
    color: #ffffff;
    text-align: center;
    border-radius: inherit;
    padding: 0.2rem 0;
    font-size: 1rem;
`;
const FilterContainer = styled.div`
    padding: 0 0.5rem 0.5rem 0.5rem;
`;
const FilterGroupName = styled.div`
    margin: 1rem 0;
    font-weight: bold;
`;
const FilterItem = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    margin-top: 1rem;
`;
const FilterInput = styled.input``;
const Label = styled.label``;
const TopicSelection = styled.select`
    width: 100%;
    font-size: inherit;
`;
const TopicOption = styled.option``;
const ApplyButton = styled.button`
    background-color: #a8485c;
    color: #ffffff;
    text-align: center;
    border-radius: inherit;
    padding: 0.2rem 0;
    font-size: 1rem;
    border-radius: 15px;
    &:hover{
        cursor: pointer;
        background-color: #893a4a;
    }
    border: none;
    outline: none;
    display: none;
    @media screen and (${devices.tablets}) {
        display: block;
    }
`;
type CustomProps = {
    showFilter: boolean;
    closeFilter: () => void;
};
const Filter = ({ showFilter, closeFilter }: CustomProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [questionsRange, setQuestionRanges] = useState<number[][]>([]);
    const mergeArrays = (arrays: number[][]) => {
        if (!arrays || arrays.length === 0) {
            return [];
        }

        let lowest = arrays[0][0];
        let highest = arrays[0][1];

        for (let i = 1; i < arrays.length; i++) {
            lowest = Math.min(lowest, arrays[i][0]);
            highest = Math.max(highest, arrays[i][1]);
        }

        return [lowest, highest];
    };
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "sort") {
            setSearchParams((prev) => {
                if (e.target.id !== "recent") {
                    prev.set(e.target.name, e.target.id);
                } else {
                    prev.delete(e.target.name);
                }
                return prev;
            });
        }
        if (e.target.name === "questions") {
            const range = e.target.id.split("-").map((value) => Number(value));
            if (e.target.checked) {
                setQuestionRanges((prev) => {
                    const newArr = [...prev, range];
                    return newArr;
                });
            } else {
                setQuestionRanges((prev) => {
                    const newArr = prev.filter(
                        (r) => r[1] !== range[1] && r[0] !== range[0]
                    );
                    return newArr;
                });
            }
        }
        if (e.target.name === "level") {
            setSearchParams((prev) => {
                const levels = prev.get("levels");
                if (e.target.checked) {
                    if (!levels) {
                        prev.set("levels", e.target.id);
                    } else {
                        const arr = levels.split(",");
                        arr.push(e.target.id);
                        prev.set("levels", arr.join());
                    }
                } else {
                    if (levels) {
                        const arr = levels.split(",");
                        prev.set(
                            "levels",
                            arr.filter((lvl) => lvl != e.target.id).join()
                        );
                    }
                }
                return prev;
            });
        }
    };
    useEffect(() => {
        setSearchParams((prev) => {
            const mergedRange = mergeArrays(questionsRange);
            if (mergedRange.length > 0) {
                prev.set("minQuantity", mergedRange[0].toString());
                prev.set("maxQuantity", mergedRange[1].toString());
            } else {
                prev.delete("minQuantity");
                prev.delete("maxQuantity");
            }
            return prev;
        });
    }, [questionsRange, searchParams]);
    return (
        <Container $show={showFilter}>
            <Header>Filter</Header>
            <FilterContainer>
                <FilterGroupName>Sort by</FilterGroupName>
                <FilterItem>
                    <FilterInput
                        type="radio"
                        name="sort"
                        id="mostPlays"
                        onChange={handleFilterChange}
                    />
                    <Label>Most Plays</Label>
                </FilterItem>
                <FilterItem>
                    <FilterInput
                        type="radio"
                        name="sort"
                        id="recent"
                        onChange={handleFilterChange}
                        defaultChecked
                    />
                    <Label>Recently Created</Label>
                </FilterItem>
                <FilterGroupName>Topic</FilterGroupName>
                <TopicSelection
                    defaultValue={searchParams.get("topicName") || "all"}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setSearchParams((prev) => {
                            console.log(e.target.value);
                            if (e.target.value === "all") {
                                prev.delete("topicName");
                                return prev;
                            }
                            prev.set("topicName", e.target.value);
                            return prev;
                        });
                    }}
                >
                    <TopicOption value={"all"}>All</TopicOption>
                    {Object.values(topicSelections).map((item) => {
                        return (
                            <TopicOption key={item} value={item}>
                                {item}
                            </TopicOption>
                        );
                    })}
                </TopicSelection>
                <FilterGroupName>Number of questions</FilterGroupName>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="questions"
                        id="10-20"
                        onChange={handleFilterChange}
                    />
                    <Label>10 - 20 questions</Label>
                </FilterItem>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="questions"
                        id="20-30"
                        onChange={handleFilterChange}
                    />
                    <Label>20 - 30 questions</Label>
                </FilterItem>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="questions"
                        id="30-100"
                        onChange={handleFilterChange}
                    />
                    <Label>{"> 30 questions"}</Label>
                </FilterItem>
                <FilterGroupName>Levels</FilterGroupName>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="level"
                        id="basic"
                        onChange={handleFilterChange}
                    />
                    <Label>Basic</Label>
                </FilterItem>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="level"
                        id="medium"
                        onChange={handleFilterChange}
                    />
                    <Label>Medium</Label>
                </FilterItem>
                <FilterItem>
                    <FilterInput
                        type="checkbox"
                        name="level"
                        id="hard"
                        onChange={handleFilterChange}
                    />
                    <Label>Hard</Label>
                </FilterItem>
                <FilterItem>
                    <ApplyButton
                        onClick={() => {
                            closeFilter();
                        }}
                    >
                        Apply
                    </ApplyButton>
                </FilterItem>
            </FilterContainer>
        </Container>
    );
};

export default Filter;
