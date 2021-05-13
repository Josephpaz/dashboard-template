import React from "react";

import { Container } from "./styles";

interface ISelectInputProps {
  //boas praticas comecar com I
  options: {
    value: string | number;
    label: string | number;
  }[]; //lista de options
}

const SelectInput: React.FC<ISelectInputProps> = ({ options }) => {
  console.log(options);
  return (
    <Container>
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
