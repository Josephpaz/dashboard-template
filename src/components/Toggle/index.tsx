import React, { useState } from "react";
import { Container, ToggleLabel, ToggleSelector } from "./styles";

const Toggle: React.FC = () => {
  const [activeSwitch, setActiveSwitch] = useState(false);
  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelector
        checked={activeSwitch}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={() => {
          setActiveSwitch(!activeSwitch);
        }}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  );
};

export default Toggle;
