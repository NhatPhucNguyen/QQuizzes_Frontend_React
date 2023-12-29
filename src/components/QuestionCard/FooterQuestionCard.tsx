import { styled } from "styled-components";
import { IQuestion } from "../../interfaces/app_interfaces";
import { btnColorGenerate } from "../../utils/stylingMethod";
import { useModalContext } from "../../context/ModalContext";
import Confirmation from "../Confirmation";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 0.5rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
const Button = styled.button<{ $method?: string }>`
    padding: 0.5rem 1.5rem;
    border: 2px solid ${(props) => btnColorGenerate(props.$method)};
    background-color: #ffffff;
    color: ${(props) => btnColorGenerate(props.$method)};
    font-weight: bold;
    font-size: inherit;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => btnColorGenerate(props.$method)};
        color: #ffffff;
    }
`;
const FooterQuestionCard = ({ questionData }: { questionData: IQuestion }) => {
    const { openModal, showModal } = useModalContext();
    return (
        <Container>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        openModal({
                            formName: "QuestionCreate",
                            questionData: questionData,
                        });
                    }}
                    $method="edit"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {
                        openModal({
                            formName: "Confirmation",
                            questionData: questionData,
                        });
                    }}
                    $method="delete"
                >
                    Delete
                </Button>
            </ButtonContainer>
            {showModal.isShow && showModal.formName === "Confirmation" && (
                <Confirmation question={showModal.questionData} />
            )}
        </Container>
    );
};

export default FooterQuestionCard;
