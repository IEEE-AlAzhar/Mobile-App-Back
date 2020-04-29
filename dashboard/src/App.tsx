import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import adminRoutes from "@globals/admin-routes";
import { RouteStructure } from "@globals/interfaces/route.interface";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {adminRoutes.map((adRoute: RouteStructure, index: number) => {
            return (
              <Route
                key={`adRoute${index}`}
                exact
                path={`/admin${adRoute.path}`}
                component={adRoute.component}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}
