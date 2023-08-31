import React from "react";
import { styled } from "styled-components";
import { devices } from "../../utils/devices";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebarContext } from "../../context/SidebarContext";

const Container = styled.div`
    display: none;
    @media screen and (${devices.phones}) {
        display: block;
    }
`;
const IconWrapper = styled.div`
    padding: 0.5rem 0 0.5rem 0;
    color: #ffffff;
`;
const HamburgerMenu = () => {
    const sidebarContext = useSidebarContext();
    return (
        <Container>
            <IconWrapper
                onClick={() => {
                    sidebarContext.openSidebar();
                }}
            >
                <FontAwesomeIcon icon={faBars} size="xl" />
            </IconWrapper>
        </Container>
    );
};

export default HamburgerMenu;
