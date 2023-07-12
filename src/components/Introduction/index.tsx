import { styled } from "styled-components";
import { devices } from "../../utils/devices";

const IntroTitle = styled.span`
    font-family: "Slackey", cursive;
    font-size: 3.5rem;
    color: #05386b;
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
    background-color: rgb(126, 104, 90, 0.3);
    border-radius: 25px;
    @media only screen and (${devices.laptops}){
        font-size: 1%.5rem;
    }
    @media only screen and (${devices.phones}) {
        font-size: 1.2rem;
    }
`;
const KeyWord = styled.span`
    color: #6eff6b;
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
