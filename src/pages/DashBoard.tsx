import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InitialContent from "../components/InitialContent";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SelectionBoard from "../components/SelectionBoard";
import { ICollection, ShowModal } from "../interfaces/app_interfaces";
import CollectionForm from "../components/CollectionForm";
import Modal from "../components/Modal";

const Container = styled.div`
    display: grid;
    grid-template-columns: 10rem auto;
    height: 100%;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const DashBoard = () => {
    const [showModal, setShowModal] = useState<ShowModal>({ isShow: false });
    const openModal = (formName?: string, collectionData?: ICollection) => {
        setShowModal({
            ...showModal,
            isShow: true,
            formName: formName,
            collectionData: collectionData,
        });
    };
    const closeModal = () => {
        setShowModal({ ...showModal, isShow: false });
    };
    return (
        <Container>
            <Sidebar openModal={openModal} />
            <Content>
                <Navbar
                    isHideLogo={true}
                    isHideButtons={true}
                    height="3.5rem"
                />
                {/* Display main content base on specific route*/}
                <Outlet context={{ openModal, closeModal }} />
                {showModal.isShow &&
                    showModal.formName === "CollectionForm" && (
                        <Modal>
                            <CollectionForm
                                collectionData={showModal.collectionData}
                                closeModal={closeModal}
                            />
                        </Modal>
                    )}
                {showModal.isShow &&
                    showModal.formName === "CollectionCreate" && (
                        <SelectionBoard closeModal={closeModal} />
                    )}
            </Content>
        </Container>
    );
};

export default DashBoard;
