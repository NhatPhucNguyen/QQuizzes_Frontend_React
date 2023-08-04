import {
    ChangeEvent,
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "styled-components";

const Container = styled.div<{ $isTrueAns?: boolean; $isOnFocus?: boolean }>`
    display: grid;
    grid-template-columns: 10% 90%;
    border: 1px solid black;
    padding: 1rem;
    background-color: #393e46;
    border: 1px solid
        ${(props) => {
            if (props.$isOnFocus) {
                return "#00adb5";
            }
            if (props.$isTrueAns) {
                return "#88BD26";
            }
            return "#EEEEEE";
        }};
    gap: 1rem;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in-out;
`;
const RadioButton = styled.input`
    appearance: none;
    background-color: inherit;
    margin: 0;
    color: currentColor;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.1rem solid #e5d429;
    border-radius: 50%;
    display: grid;
    place-content: center;
    &:hover {
        cursor: pointer;
    }
    &:before {
        content: "";
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        transform: scale(0);
        transition: 0.2s transform ease-in-out;
        box-shadow: inset 1em 1em #88bd26;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    &:checked:before {
        transform: scale(1);
    }
`;
const AnswerInput = styled.input`
    width: 100%;
    padding: 0.2rem 0.5rem;
    border: none;
    outline: none;
    background-color: inherit;
    font-size: inherit;
    font-family: inherit;
    color: #eeeeee;
    &::placeholder {
        color: #949ba6;
    }
`;
const SelectionItem = (props: {
    isRefresh: boolean;
    setIsRefresh: Dispatch<SetStateAction<boolean>>;
    radioIndex: number;
}) => {
    const [isTrueAns, setIsTrueAns] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const { register } = useFormContext();
    useEffect(() => {
        const radioButtonElement = document.getElementById(`${props.radioIndex}`) as HTMLInputElement
        if (radioButtonElement.checked === false) {
            setIsTrueAns(false);
        }
    }, [props.isRefresh, props.radioIndex]);
    return (
        <Container $isTrueAns={isTrueAns} $isOnFocus={isFocus}>
            <RadioButton
                id={props.radioIndex.toString()}
                type="radio"
                defaultValue={props.radioIndex}
                {...register("trueIndexAns")}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setIsTrueAns(e.currentTarget.checked);
                    props.setIsRefresh(!props.isRefresh);
                }}
            />
            <AnswerInput
                placeholder="Enter answer here..."
                {...register(`answers[${props.radioIndex}]`)}
                onFocus={() => {
                    setIsFocus(true);
                }}
                onBlur={() => {
                    setIsFocus(false);
                }}
            />
        </Container>
    );
};

export default SelectionItem;
