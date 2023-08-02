import React from "react";
import Navbar from "../../components/Navbar";
import SubNav from "../../components/SubNav";
import Main from "../../Layout/Main";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const QuestionManagement = () => {
    return (
        <Main props={{ noGap: true }}>
            <Navbar isHideButtons={true} />
            <SubNav isShowQuestNum={false} />
            <Container>
                <Outlet />
            </Container>
        </Main>
    );
};

export default QuestionManagement;
