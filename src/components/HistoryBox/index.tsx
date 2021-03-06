import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Container, Header, Legend, LegendContainer } from "./styles";
import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}) => (
  <Container>
    <Header>
      <h2>Histórico de Saldo</h2>
      <LegendContainer>
        <Legend color={lineColorAmountEntry}>
          <div>{}</div>
          <span>Entradas</span>
        </Legend>
        <Legend color={lineColorAmountOutput}>
          <div>{}</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </Header>

    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" />
        <XAxis dataKey="month" stroke="#CECECE" />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Line
          type="monotone"
          dataKey="amountEntry"
          name="Entradas"
          stroke={lineColorAmountEntry}
          strokeWidth={5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="amountOutput"
          name="Saídas"
          stroke={lineColorAmountOutput}
          strokeWidth={5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Container>
);

export default HistoryBox;
