import React from "react";
//responsive container se ajusta automaticamente ao componente que esta relacionado.
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Container,
  SideLeft,
  SideRight,
  LegendContainer,
  Legend,
} from "./styles";

interface IPieChartBoxProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartBox: React.FC<IPieChartBoxProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((indicator) => (
          <Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="percent">
            {data.map((indicator) => (
              <Cell key={indicator.name} fill={indicator.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartBox;
