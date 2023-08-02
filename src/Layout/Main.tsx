import { styled } from "styled-components";

type CustomProps = {
    noGap?: boolean;
};

const Container = styled.div<{ $noGap?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${(props) => (props.$noGap ? 0 : "2rem")};
    height: 100%;
`;
const Main = ({
    props,
    children,
}: {
    children?: React.ReactNode;
    props?: CustomProps;
}) => {
    return <Container $noGap={props?.noGap}>{children}</Container>;
};

export default Main;
