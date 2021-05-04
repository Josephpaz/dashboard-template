import React from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import dark from "./styles/themes/dark";
// import light from "./styles/themes/light";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <Layout />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
