import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    height: inherit;
    padding: 0 0.5rem;
    text-align: center;
`;
const Error = styled.h1``;
const Message = styled.p``;
const Button = styled.button`
    background-color: #cb5454;
    color: #ffffff;
    border: none;
    font-size: 1.1rem;
    padding: 0.5rem 2rem;
    border-radius: 15px;
    &:hover {
        background-color: #a14242;
        cursor: pointer;
    }
`;
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar isHideButtons={true} />
            <Container>
                <Error>404 - Page not found</Error>
                <Message>
                    The page you are looking for might have been removed had its
                    name changed or is temporarily unavailable.
                </Message>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Go to home page
                </Button>
            </Container>
        </>
    );
};

export default NotFound;
