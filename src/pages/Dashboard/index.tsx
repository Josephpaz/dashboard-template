import React, { useState, useMemo, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletsBox";
import MessageBox from "../../components/MessageBox";

import { Container, Content } from "./styles";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      //inclues() verifica se o elemento esta ou nao no array
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalBalance == 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês, exatamente o que ganhou",
        footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Que bom!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput
          options={months}
          onChange={(event) => setMonthSelected(Number(event.target.value))}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(event) => setYearSelected(Number(event.target.value))}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="saldo"
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saidas"
          color="#4E41F0"
          icon="dolar"
          isPositive={totalBalance >= 0 ? true : false}
        />
        <WalletBox
          title="entradas"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saidas"
          color="#F7931B"
          icon="arrowUp"
        />
        <WalletBox
          title="saidas"
          amount={totalExpenses}
          footerlabel="atualizado com base nas entradas e saidas"
          color="#E44C4E"
          icon="arrowDown"
        />
      </Content>
      <MessageBox
        title={message.title}
        description={message.description}
        footerText={message.footerText}
        icon={message.icon}
      />
    </Container>
  );
};

export default Dashboard;
