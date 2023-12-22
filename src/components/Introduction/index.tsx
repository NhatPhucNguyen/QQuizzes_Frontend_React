import { styled } from "styled-components";
import { devices } from "../../config/devices";

const IntroTitle = styled.span`
    font-family: "Slackey", cursive;
    font-size: 3.5rem;
    color: #86A69D;
    @media only screen and (${devices.phones}) and (${devices.laptops}){
        font-size: 2rem;
    }
    @media only screen and (${devices.laptops}){
        font-size: 2rem;
    }
`;
const BriefDesc = styled.span`
    color: #000000;
    font-size: 1.8rem;
    width: 70%;
    padding: 0.5rem;
    background-color: #f7d4dc;
    border-radius: 25px;
    @media only screen and (${devices.laptops}){
        font-size: 1%.5rem;
    }
    @media only screen and (${devices.phones}) {
        font-size: 1.2rem;
    }
`;
const KeyWord = styled.span`
    color: #F2B263;
    font-family: inherit;
    font-size: inherit;
    text-decoration: underline;
`;
const Introduction = () => {
    return (
        <>
            <IntroTitle>
                <KeyWord>Learning</KeyWord> is a lifelong process.
            </IntroTitle>
            <BriefDesc>
                Easy-to-customize content tools for inclusive assessment,
                instruction, and practice.
            </BriefDesc>
        </>
    );
};

export default Introduction;
