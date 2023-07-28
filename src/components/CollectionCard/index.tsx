import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { ICollection, ModalContext } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import { API } from "../../config/API";

type CustomProps = {
    collection: ICollection;
};

const Container = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
`;
const CollectionName = styled.span`
    font-weight: bold;
    font-size: 1rem;
`;

const Topic = styled.span`
    font-size: 0.8rem;
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
const Quantity = styled.span`
    font-size: 0.8rem;
`;
const Level = styled.span`
    font-size: 0.8rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
`;
const Button = styled.button`
    padding: 0.2rem;
`;

const CollectionCard = ({ collection }: CustomProps) => {
    const outletContext = useOutletContext<ModalContext>();
    const navigate = useNavigate();
    const handleDeleteClick = () => {
        const deleteCollection = async () => {
            try {
                console.log(collection.collectionName);
                const response = await customAxios.delete(
                    API + `/api/collection/delete/${collection.collectionName}`
                );
                if (response.status === 200) {
                    navigate(0);
                }
            } catch (error) {
                console.log(error);
            }
        };
        void deleteCollection();
    };
    return (
        <Container>
            <CollectionName>{collection.collectionName || " "}</CollectionName>
            <Topic>{collection.topic || " "}</Topic>
            <SubContainer>
                <Quantity>{collection.quantity || 0}</Quantity>
                <Level>{collection.level || " "}</Level>
            </SubContainer>
            <ButtonContainer>
                <Button>View</Button>
                <Button
                    onClick={() => {
                        outletContext.openModal("CollectionForm", collection);
                    }}
                >
                    Update
                </Button>
                <Button onClick={handleDeleteClick}>Delete</Button>
            </ButtonContainer>
        </Container>
    );
};

export default CollectionCard;
