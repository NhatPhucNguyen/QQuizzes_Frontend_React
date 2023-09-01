import { styled } from "styled-components";
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    align-items: end;
`;
const Field = styled.span`
    text-align: right;
`;
const Detail = styled.span`
    text-align: left;
`;

type CustomProps = {
    field: string;
    detail: string;
};

const DetailItem = (props:CustomProps) => {
    return (
        <Container>
            <Field>{props.field}:</Field>
            <Detail>{props.detail}</Detail>
        </Container>
    );
};

export default DetailItem;
