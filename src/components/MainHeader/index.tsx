import React, { useState, useMemo } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import emojis from "../../utils/emojis";
import Toggle from "../Toggle";

import { useTheme } from "../../hooks/themes";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length); //numero de emojis
    return emojis[indice];
  }, []);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  return (
    <Container>
      <Toggle labelLeft="Light" labelRight="Drak" checked={darkTheme} onChange={handleChangeTheme}/>
      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Joseph Paz</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
