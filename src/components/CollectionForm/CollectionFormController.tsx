import { useFormContext } from "react-hook-form";
import { styled } from "styled-components";

type CustomProps = {
    label: string;
    type: string;
    id: string;
    name?: string;
    defaultValue?:string
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    outline: solid 2px ${(props) => (props.$isValid ? "black" : "red")};
`;
const CollectionFormController = (props: CustomProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Container>
            <Label htmlFor={props.id}>{props.label}</Label>
            <FormInput
                type={props.type}
                id={props.id}
                {...register(props.id, { required: true })}
                aria-invalid={errors[props.id] ? "true" : "false"}
                $isValid={errors[props.id] === undefined && true}
                defaultValue={props.defaultValue}
            />
        </Container>
    );
};

export default CollectionFormController;
