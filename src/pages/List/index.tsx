import React, { useMemo, useState, useEffect } from "react";
// useMemo memoriza valor

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

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

  const options = [
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
  ];

  const years = [
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];

  useEffect(() => {
    const response = listData.map((item) => {
      return {
        id: Math.random() * data.length,
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)), //convertendo a string para tipo Number
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41f0" : "#E44C4E",
      };
    });
    setData(response);
  }, []);
  //caso nao se coloque nenhuma variavel dentro do [] ele carregara uma vez a cada reload da pagina
  //caso tenha uma variavel ele disparará a funcao sempre que a variavel alterar seu valor

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={options} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          RECORRENTES
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
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
