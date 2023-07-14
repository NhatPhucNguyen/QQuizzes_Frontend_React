import { FormEvent, useState } from "react";
import { FormLayout, FormTitle, SignUpButton } from ".";
import FormController from "./FormController";
import { IAlert, IUser } from "../../interfaces/app_interfaces";
import Alert from "./Alert";

const defaultUserData: IUser = {
    fullName: "",
    username: "",
    password: "",
    email: "",
    purpose: "",
};

const SignUpForm = () => {
    const [userData, setUserData] = useState<IUser>(defaultUserData);
    const [alert, setAlert] = useState({} as IAlert);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isFulfill = true;
        Object.values(userData).forEach((field) => {
            if (field === "" || field === undefined) {
                isFulfill = false;
            }
        });
        if (isFulfill) {
            const emailRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (emailRegex.test(userData.email)) {
                console.log(userData);
            } else {
                setAlert({
                    isShow: true,
                    message: "Please enter a valid email",
                });
            }
        } else {
            setAlert({
                isShow: true,
                message: "Please fulfill required fields",
            });
        }
    };
    return (
        <FormLayout onSubmit={handleSubmit}>
            <FormTitle>Sign Up to QQuizzes</FormTitle>
            {alert.isShow && <Alert message={alert.message} />}
            <FormController
                type="text"
                label="Full Name"
                name="fullName"
                setUserData={setUserData}
                value={userData.fullName}
            />
            <FormController
                type="text"
                label="Username"
                name="username"
                setUserData={setUserData}
                value={userData.username}
            />
            <FormController
                type="password"
                label="Password"
                name="password"
                setUserData={setUserData}
                value={userData.password}
            />
            <FormController
                type="text"
                label="Email"
                name="email"
                setUserData={setUserData}
                value={userData.email}
            />
            <FormController
                type="text"
                label="Purpose"
                name="purpose"
                setUserData={setUserData}
                value={userData.purpose}
            />
            <SignUpButton type="submit">Sign Up</SignUpButton>
        </FormLayout>
    );
};

export default SignUpForm;