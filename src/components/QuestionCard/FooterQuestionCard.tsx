import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { customAxios } from "../../config/axiosConfig";
import { IQuestion, ModalContext } from "../../interfaces/app_interfaces";
import { btnColorGenerate } from "../../utils/stylingMethod";

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
    const outletContext = useOutletContext<ModalContext>();
    return (
        <Container>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        outletContext.openModal({
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
                        outletContext.openModal({
                            formName: "Confirmation",
                            questionData: questionData,
                        });
                    }}
                    $method="delete"
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default FooterQuestionCard;
