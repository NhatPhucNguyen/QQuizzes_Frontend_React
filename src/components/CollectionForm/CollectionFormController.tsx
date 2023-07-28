import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "styled-components";

type CustomProps = {
    label: string;
    type: string;
    id: string;
    name?: string;
    defaultValue?: string;
    selectOptions?: string[];
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;
const Label = styled.label`
    font-weight: bold;
`;
const FormInput = styled.input<{ $isValid?: boolean }>`
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: none;
    outline: solid 2px ${(props) => (props.$isValid ? "#AFD270" : "#df0000")};
    background-color: #f2e8df;
`;
const Select = styled.select<{ $isValid?: boolean }>`
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: none;
    outline: solid 2px ${(props) => (props.$isValid ? "#AFD270" : "#df0000")};
    background-color: #f2e8df;
`;

const CollectionFormController = (props: CustomProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Container>
            <Label htmlFor={props.id}>{props.label}</Label>
            {props.type !== "select" && (
                <FormInput
                    type={props.type}
                    id={props.id}
                    {...register(props.id, { required: true })}
                    aria-invalid={errors[props.id] ? "true" : "false"}
                    $isValid={errors[props.id] === undefined ? true : false}
                    defaultValue={props.defaultValue}
                />
            )}
            {props.type === "select" && (
                <Select
                    id={props.id}
                    {...register(props.id, { required: true })}
                    aria-invalid={errors[props.id] ? "true" : "false"}
                    $isValid={errors[props.id] === undefined ? true : false}
                    defaultValue={props.defaultValue}
                >
                    {props.selectOptions?.map((option) => (
                        <option key={props.selectOptions?.indexOf(option)}>
                            {option}
                        </option>
                    ))}
                </Select>
            )}
        </Container>
    );
};

export default CollectionFormController;
