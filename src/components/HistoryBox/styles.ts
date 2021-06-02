import styled, { keyframes } from "styled-components";

interface ILegendProps {
  color: string;
}

const animate = keyframes`
  0%{
    transform: translateX(-100px);
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

export const Container = styled.div`
  width: 100%;
  height: 400px;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px 80px;
  border-radius: 7px;

  animation: ${animate} 0.5s;
`;

export const LegendContainer = styled.ul`
  display: flex;
  list-style: none;
  padding-right: 16px;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 7px;
  > div {
    background-color: ${(props) => props.color};
    border-radius: 5px;
    width: 40px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  > span {
    margin-left: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > h2 {
    margin-bottom: 20px;
    margin-left: 18px;
  }
`;
