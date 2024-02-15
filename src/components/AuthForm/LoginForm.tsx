import { FormLayout, FormTitle, LoginButton } from ".";
import { Alert, User } from "../../interfaces/app_interfaces";
import FormController from "./FormController";
import { useState, FormEvent } from "react";
import { AxiosError } from "axios";
import { customAxios } from "../../config/axiosConfig";
import AlertBar from "./AlertBar";
import { useNavigate } from "react-router-dom";
type DataReturn = {
    accessToken: string;
    fullName: string;
    userId: string;
};
const LoginForm = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    } as User);
    const [alert, setAlert] = useState({} as Alert);
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userData.username || !userData.password) {
            setAlert({
                isShow: true,
                message: "Please enter username or password",
            });
        } else {
            const login = async () => {
                try {
                    const response = await customAxios.post(
                        "/auth/login",
                        JSON.stringify(userData)
                    );
                    if (response.status === 200) {
                        const { accessToken, fullName, userId } =
                            response.data as DataReturn;
                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("fullName", fullName);
                        localStorage.setItem("userId", userId);
                        navigate(-1);
                    }
                } catch (err) {
                    if (err instanceof AxiosError) {
                        if (err.response?.status === 404) {
                            const { message } = err.response?.data as {
                                message: string;
                            };
                            setAlert({ isShow: true, message: message });
                        } else if (err.request) {
                            const { message } = err as {
                                message: string;
                            };
                            setAlert({ isShow: true, message: message });
                        } else {
                            console.log(err);
                        }
                    }
                }
            };
            void login();
        }
    };
    return (
        <FormLayout onSubmit={handleSubmit}>
            <FormTitle>Login to QQuizzes</FormTitle>
            {alert.isShow && <AlertBar message={alert.message} />}
            <FormController
                name="username"
                id="username"
                label="Username"
                type="text"
                value={userData.username}
                setUserData={setUserData}
            />
            <FormController
                name="password"
                id="password"
                label="Password"
                type="password"
                value={userData.password}
                setUserData={setUserData}
            />
            <LoginButton type="submit">Login</LoginButton>
        </FormLayout>
    );
};

export default LoginForm;
