import { styled } from "styled-components";
import CollectionCard from "../CollectionCard";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { ICollection } from "../../interfaces/app_interfaces";
import SelectionBoard from "../SelectionBoard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Title = styled.h1`
    text-align: center;
`;
const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
`;
const MyCollection = () => {
    const collectionsData = useLoaderData() as ICollection[];
    return (
        <Container>
            <Title>Collection Management</Title>
            <CardsContainer>
                {collectionsData.map((collection) => {
                    return (
                        <CollectionCard
                            key={collection._id}
                            collection={collection}
                        />
                    );
                })}
            </CardsContainer>
        </Container>
    );
};

export default MyCollection;
