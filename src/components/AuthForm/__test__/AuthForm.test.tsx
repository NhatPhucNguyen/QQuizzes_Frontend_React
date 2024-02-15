import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import AuthForm from "..";
import { MemoryRouter } from "react-router-dom";
import AuthFormProvider from "../../../context/AuthFormContext";
import LoginForm from "../LoginForm";
import mocks from "../../../apis/__tests__/__mocks__/axiosMocks";
import { AxiosError, AxiosResponse } from "axios";
beforeAll(() => {
    vi.resetModules();
});
describe("(Authentication Form) Component", () => {
    test("Form layout based on switch state", () => {
        render(
            <MemoryRouter>
                <AuthFormProvider>
                    <AuthForm />
                </AuthFormProvider>
            </MemoryRouter>
        );
        expect(screen.getByRole("login-layout")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("btn-switch"));
        expect(screen.getByRole("signUp-layout")).toBeInTheDocument();
    });
    test("Display error when login failed", async () => {
        const { container } = render(
            <MemoryRouter>
                <AuthFormProvider>
                    <LoginForm />
                </AuthFormProvider>
            </MemoryRouter>
        );
        const error = {} as AxiosError;
        error.response = {
            status: 404,
            data: {
                message: "error",
            },
        } as AxiosResponse;
        mocks.post.mockRejectedValue(error);
        fireEvent.change(
            container.querySelector("#username") as HTMLInputElement,
            {
                target: {
                    value: "admin",
                },
            }
        );
        fireEvent.change(
            container.querySelector("#password") as HTMLInputElement,
            {
                target: {
                    value: "password",
                },
            }
        );
        fireEvent.click(screen.getByRole("button", { name: "Login" }));
        await waitFor(() => {
            expect(screen.getByRole("alert-message")).toBeInTheDocument();
        });
    });
});
