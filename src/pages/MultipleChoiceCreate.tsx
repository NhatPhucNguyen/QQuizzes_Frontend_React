import React from "react";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const MultipleChoiceCreate = () => {
    return (
        <Container>
            <Navbar isHideButtons={true} />
            <SubNav />
        </Container>
    );
};

export default MultipleChoiceCreate;
