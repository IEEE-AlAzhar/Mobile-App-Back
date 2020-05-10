import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from "react-router-dom";

import { adminRoutes } from "configurations/admin-routes";
import { RouteStructure } from "configurations/interfaces/route.interface";

import "./App.css";

export default class App extends Component<RouteProps> {
  render() {
    return (
      <Router>
        <Switch>
          {adminRoutes.map((adRoute: RouteStructure, index: number) => {
            return (
              <Route
                key={`adRoute${index}`}
                exact
                path={adRoute.path}
                component={adRoute.component as any}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}
