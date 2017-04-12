import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
import Home from './Pages/Home';
import Layout from "./components/Layout";
import Dashboard from './Pages/Dashboard';
const app = document.getElementById('app');

let routes = (
    <Route path="/" component={Home}>
        <IndexRoute component={Layout} />
        <Route path="/dashboard" name="dashboard" component={Dashboard}></Route>
    </Route>
);

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, app);
