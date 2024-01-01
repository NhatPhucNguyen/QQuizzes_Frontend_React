import styled, { keyframes } from "styled-components";
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); 
}
`;
type StyleProps = {
    $color: string;
    $size:number;
    $thickness:number
};
const Loader = styled.div<StyleProps>`
    border: ${props => `${props.$thickness * 2}px`} solid #f3f3f3; /* Light grey */
    border-top: ${props => `${props.$thickness * 2}px`} solid ${(props) => props.$color}; /* Blue */
    border-radius: 50%;
    width: ${props => `${props.$size * 20}px`};
    height: ${props => `${props.$size * 20}px`};
    animation: ${spin} 2s linear infinite;
    margin: auto;
`;
const LoaderSpin = (props: StyleProps) => {
    return <Loader $color={props.$color} $size={props.$size} $thickness={props.$thickness}/>;
};

export default LoaderSpin;
