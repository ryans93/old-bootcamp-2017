import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Bolus from "./pages/Bolus";
import Basal from "./pages/Basal";
import Meals from "./pages/Meals";
import Settings from "./pages/Settings";
import NoMatch from "./pages/NoMatch";

const App = () =>
<Router>
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/bolus" component={Bolus} />
      <Route exact path="/basal" component={Basal} />
      <Route exact path="/meals" component={Meals} />
      <Route exact path="/settings" component={Settings} />
      <Route component={NoMatch} />
    </Switch>
  </div>
</Router>;

export default App;
