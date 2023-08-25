import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
const Container = styled.div`
    background-color: rgb(242, 184, 75, 0.3);
    padding: 1rem;
    border-radius: 25px;
`;
const RuleItem = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
`;
const Description = styled.span`
    display: block;
`;
const RuleInfo = () => {
    return (
        <Container>
            <RuleItem>
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ed3535" }}
                />
                <Description>
                    Player must complete the quiz before the time limit to get
                    the result.
                </Description>
            </RuleItem>
            <RuleItem>
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ed3535" }}
                />
                <Description>
                    If player reset the quiz in the period of playing, the
                    result will not be updated.
                </Description>
            </RuleItem>
        </Container>
    );
};

export default RuleInfo;
