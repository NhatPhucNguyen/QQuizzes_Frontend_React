import { styled } from "styled-components"

type FormControllerProps = {
    label:string,
    name:string,
    type:string,
    placeHolder?:string;
}
const ControllerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 70%;
`
const Label = styled.label`
    font-weight: bold;
`
const FormInput = styled.input`
    font-size: inherit;
    font-family: inherit;
    padding: 0.5rem 1rem;
`
function FormController(props:FormControllerProps) {
  return (
    <ControllerContainer>
        <Label>{props.label}</Label>
        <FormInput type="text" value={"test"}></FormInput>
    </ControllerContainer>
  )
}

export default FormController