import styled, { keyframes } from "styled-components";

interface IContainerProps {
  color: string;
}

const animate = keyframes`
  0%{
    transform: translateX(100px);
    opacity: 0;
  }

  50%{
    opacity: .3;
  }

  100%{
    transform: translateX(0px);
    opacity: 1;
  }

`;

export const Container = styled.div<IContainerProps>`
  background-color: ${(props) => props.color};
  width: 32%;
  height: 150px;
  margin: 10px 0;
  color: ${(props) => props.theme.colors.white};
  border-radius: 7px;
  padding: 10px 20px;

  position: relative;
  overflow: hidden;
  animation: ${animate} .5s;

  > img {
    position: absolute;
    height: 110%;
    top: -10px;
    right: -30px;
    opacity: 0.3;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }

  .saldo-true {
    color: #29c7ac;
  }

  .saldo-false {
    color: #f14e69;
  }
`;
