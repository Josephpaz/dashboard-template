import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// useMemo memoriza valor

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";
import { Container, Content, Filters } from "./styles";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  }; //sequencia de acesso paramentros
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  //use
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);

  const { type } = match.params; //pegando a utl, destructor

  const title = useMemo(() => {
    return type === "entry-balance" ? "Entradas" : "Saídas";
  }, [type]); //arrow function + paramentro variavel que sempre atualizar roda a funcao

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7913B" : "#E44C4E";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]);

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
    listData.forEach((item) => {
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
  }, [listData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredDate.map((item) => {
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)), //convertendo a string para tipo Number
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#E44C4E" : "#4E41f0",
      };
    });

    setData(formattedData);
  }, [listData, monthSelected, yearSelected, data.length, selectedFrequency]);

  //
  //caso nao se coloque nenhuma variavel dentro do [] ele carregara uma vez a cada reload da pagina
  //caso tenha uma variavel ele disparará a funcao sempre que a variavel alterar seu valor

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter 
          tag-filter-recurrent
          ${selectedFrequency.includes("eventual") && "tag-actived"}`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          RECORRENTES
        </button>
        <button
          type="button"
          className={`tag-filter
          tag-filter-eventual
          ${selectedFrequency.includes("recorrente") && "tag-actived"}`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          EVENTUAIS
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={`${item.amountFormatted}`}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
