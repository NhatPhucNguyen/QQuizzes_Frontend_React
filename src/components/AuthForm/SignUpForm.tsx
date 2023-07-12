import { FormLayout, FormTitle, SignUpButton } from "."
import FormController from "./FormController"

const SignUpForm = () => {
  return (
    <FormLayout>
        <FormTitle>Sign Up to QQuizzes</FormTitle>
        <FormController type="text" label="Full Name" name="fullName"/>
        <FormController type="text" label="Username" name="username"/>
        <FormController type="text" label="Password" name="password"/>
        <FormController type="text" label="Email" name="email"/>
        <FormController type="text" label="Purpose" name="purpose"/>
        <SignUpButton>Sign Up</SignUpButton>
    </FormLayout>
  )
}

export default SignUpForm