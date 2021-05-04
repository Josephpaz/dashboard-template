import React from "react";
import {
  Container,
  Header,
  LogoImg,
  MenuContainer,
  MenuItemLink,
  Title,
} from "./styles";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";

import logoImg from "../../assets/logo.svg";

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo Dashboard" />
        <Title>Minha Carteira</Title>
      </Header>
      <MenuContainer>
        <MenuItemLink href="#">
          <MdDashboard />
          Dashboard
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowUpward />
          Entradas
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowDownward />
          Saídas
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdExitToApp />
          Sair
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
