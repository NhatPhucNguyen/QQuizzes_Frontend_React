import { styled } from "styled-components";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { IUser } from "../../interfaces/app_interfaces";
import { emailValidate } from "../../utils/emailValidate";
type FormControllerProps = {
    label: string;
    name: string;
    id?: string;
    type: string;
    value?: string;
    placeHolder?: string;
    setUserData: Dispatch<SetStateAction<IUser>>;
};
const ControllerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 70%;
`;
const Label = styled.label`
    font-weight: bold;
`;
const FormInput = styled.input<{ $isValid?: boolean }>`
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem 1rem;
    outline: ${(props) =>
        props.$isValid ? "solid 2px #AFD270" : "solid 2px #df0000"};
    border: none;
    &:focus {
        outline: ${(props) =>
            props.$isValid ? "solid 2px #AFD270" : "solid 2px #df0000"};
    }
    border-radius: 10px;
`;
function FormController(props: FormControllerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        if (!inputRef.current?.value) {
            setIsValid(false);
        } else if (inputRef.current.name === "email") {
            setIsValid(emailValidate(inputRef.current.value));
        } else {
            setIsValid(true);
        }
    }, []);
    return (
        <ControllerContainer>
            <Label htmlFor={props.id}>{props.label}</Label>
            <FormInput
                type={props.type}
                value={props.value}
                placeholder={props.placeHolder}
                name={props.name}
                id={props.id}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = e.currentTarget;
                    if (!value) {
                        setIsValid(false);
                    } else if (name === "email") {
                        setIsValid(emailValidate(value));
                    } else {
                        setIsValid(true);
                    }
                    props.setUserData((prevUser) => {
                        return {
                            ...prevUser,
                            [name]: value,
                        };
                    });
                }}
                $isValid={isValid}
                ref={inputRef}
            />
        </ControllerContainer>
    );
}

export default FormController;
