import React, { useMemo } from "react";
import CountUp from "react-countup";

import { Container } from "./styles";

import dolarImg from "../../assets/dollar.svg";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerlabel: string;
  color: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
}

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerlabel,
  color,
  icon,
}) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case "dolar":
        return dolarImg;
      case "arrowUp":
        return arrowDown;
      case "arrowDown":
        return arrowUp;
      default:
        return dolarImg;
    }
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <CountUp
          end={amount}
          prefix={"R$ "}
          separator={"."}
          decimal={","}
          decimals={2}
        />
      </h1>
      <small>{footerlabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

export default WalletBox;
