import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@minha-carteira:logged");
    return !!isLogged;
    //expressao logica para saber se uma variavel tem conteundo
    // caso tenha, true
    //caso não, false.
  });

  const signIn = (email: string, password: string) => {
    if (email === "josephpaz@gmail.com" && password === "123") {
      localStorage.setItem("@minha-carteira:logged", "true");
      setLogged(true);
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@minha-cartira:logged");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
