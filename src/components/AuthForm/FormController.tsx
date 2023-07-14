import { styled } from "styled-components";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IUser } from "../../interfaces/app_interfaces";
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
const FormInput = styled.input`
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem 1rem;
    outline: solid 1px #000000;
    border: none;
    &:focus {
        outline: solid 2px #e7717d;
    }
    border-radius: 10px;
`;
function FormController(props: FormControllerProps) {
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
                    props.setUserData((prevUser) => {
                        return {
                            ...prevUser,
                            [name]: value,
                        };
                    });
                }}
            />
        </ControllerContainer>
    );
}

export default FormController;
