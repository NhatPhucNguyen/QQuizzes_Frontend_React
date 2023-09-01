import { styled } from "styled-components";
import { levelColorText } from "../../utils/stylingMethod";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    border-bottom: 1px dashed gray;
    gap: 1rem;
    align-items: center;
`;
const Field = styled.span`
    font-weight: bold;
    text-align: right;
`;
const Desc = styled.span<{ $level?: string }>`
    color: ${(props) => levelColorText(props.$level)};
    text-align: left;
`;

type CustomProps = {
    field: string;
    desc: string;
    level?: string;
};

const QuizDetailItem = (props: CustomProps) => {
    return (
        <Container>
            <Field>{props.field}:</Field>
            <Desc $level={props.level}>{props.desc}</Desc>
        </Container>
    );
};

export default QuizDetailItem;
