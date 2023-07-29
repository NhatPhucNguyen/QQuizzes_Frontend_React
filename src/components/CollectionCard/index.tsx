import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { ICollection, ModalContext } from "../../interfaces/app_interfaces";
import { customAxios } from "../../config/axiosConfig";
import { API } from "../../config/API";
import { faEye, faListCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    width: 15rem;
    gap: 0.5rem;
`;
const CollectionName = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
`;

const Topic = styled.span`
    font-size: 1rem;
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
    justify-content: center;
    gap: 2.5rem;
    width: 100%;
`;
const Button = styled.button`
    padding: 0.2rem;
    background-color: inherit;
    border: none;
    outline: none;
    &:hover {
        cursor: pointer;
        color: #86a69d;
    }
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
                <Quantity>
                    {collection.quantity
                        ? `${collection.quantity} questions`
                        : `0 questions`}{" "}
                </Quantity>
                <Level>{collection.level || " "}</Level>
            </SubContainer>
            <ButtonContainer>
                <Button>
                <FontAwesomeIcon icon={faEye} size="xl" />
                </Button>
                <Button
                    onClick={() => {
                        outletContext.openModal("CollectionForm", collection);
                    }}
                >
                    <FontAwesomeIcon icon={faPen} size="xl" />
                </Button>
                <Button onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} size="xl" />
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default CollectionCard;
