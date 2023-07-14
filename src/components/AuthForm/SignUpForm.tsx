import { FormEvent, useState } from "react";
import { FormLayout, FormTitle, SignUpButton } from ".";
import FormController from "./FormController";
import { IAlert, IUser } from "../../interfaces/app_interfaces";
import Alert from "./Alert";
import axios, { AxiosError } from "axios";
import { API } from "../../config/API";
import { useNavigate } from "react-router-dom";

const defaultUserData: IUser = {
    fullName: "",
    username: "",
    password: "",
    email: "",
    purpose: "",
};

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SignUpForm = () => {
    const [userData, setUserData] = useState<IUser>(defaultUserData);
    const [alert, setAlert] = useState({} as IAlert);
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isFulfill = true;
        Object.values(userData).forEach((field) => {
            if (field === "" || field === undefined) {
                isFulfill = false;
            }
        });
        if (isFulfill) {
            if (emailRegex.test(userData.email)) {
                const submit = async () => {
                    try {
                        const response = await axios.post(
                            API + "/auth/register",
                            JSON.stringify(userData),
                            {
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        if (response.status === 200) {
                            navigate(0);
                        }
                        if (response.status == 409) {
                            const { message } = response.data as {
                                message: string;
                            };
                            setAlert({ isShow: true, message: message });
                        }
                    } catch (err) {
                        if (err instanceof AxiosError) {
                            const { message } = err.response?.data as {
                                message: string;
                            };
                            setAlert({ isShow: true, message: message });
                        }
                    }
                };
                void submit();
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
