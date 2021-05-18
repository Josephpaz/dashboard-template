import React, { useMemo, useState, useEffect } from "react";
import { uuid } from "uuidv4";
// useMemo memoriza valor

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import linstOfMonths from "../../utils/months";
import { Container, Content, Filters } from "./styles";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  }; //sequencia de acesso paramentros
}

interface IData {
  id: number;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  //use
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );

  // const [selectedFrequency, setSelectedFrequency] = useState<string[]>([
  //   "recorrente",
  //   "eventual",
  // ]);

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

  // const months = [
  //   { value: 1, label: "Janeiro" },
  //   { value: 5, label: "Maio" },
  //   { value: 7, label: "Julho" },
  // ];

  const months = useMemo(() => {
    return linstOfMonths.map((month, index) => {
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

  // const handleFrequencyClick = (frequency: string) => {
  //   const alreadySelected = selectedFrequency.findIndex(
  //     (item) => item === frequency
  //   );

  //   if (alreadySelected >= 0) {
  //     const filtered = selectedFrequency.filter((item) => item !== frequency);
  //     setSelectedFrequency(filtered);
  //   } else {
  //     setSelectedFrequency((prev) => [...prev, frequency]);
  //   }
  // };

  useEffect(() => {
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredDate.map((item) => {
      return {
        id: Number(uuid()),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)), //convertendo a string para tipo Number
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#E44C4E" : "#4E41f0",
      };
    });
    console.log(filteredDate);
    setData(formattedData);
  }, [listData, monthSelected, yearSelected]);

  //
  //caso nao se coloque nenhuma variavel dentro do [] ele carregara uma vez a cada reload da pagina
  //caso tenha uma variavel ele disparará a funcao sempre que a variavel alterar seu valor

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput
          options={months}
          onChange={(event) => setMonthSelected(event.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(event) => setYearSelected(event.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          // onClick={() => handleFrequencyClick("recorrente")}
          className="tag-filter tag-filter-recurrent"
        >
          RECORRENTES
        </button>
        <button
          type="button"
          // onClick={() => handleFrequencyClick("eventual")}
          className="tag-filter tag-filter-eventual"
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
            subtitle={item.dataFormatted}
            amount={`${item.amountFormatted}`}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
