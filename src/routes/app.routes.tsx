import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";

const AppRoutes: React.FC = () => {
  // const routesSidebar = [
  //   {
  //     path: '/dash'
  //   }
  // ]
  // retorna sempre um componente baseado na rota
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/list/:type" component={List} />
      </Switch>
    </Layout> 
  );
};

export default AppRoutes;
