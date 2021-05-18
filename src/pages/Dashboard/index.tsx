import React from "react";
import { Container } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const Dashboard: React.FC = () => {
  const options = [
    {
      value: "Joseph",
      label: "Joseph12",
    },

    {
      value: "Leonardo",
      label: "LeonardoSilva",
    },

    {
      value: "Fadel",
      label: "Gustavo",
    },
  ];

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#FFF">
        <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
