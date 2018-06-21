import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {ApolloProvider} from "react-apollo";

import client from "./store.js";
import Starships from "./Starships";
import Starship from "./Starship";
import About from "./About";

import "./App.css";

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <div>
        <header className="App-header">
          <h1 className="App-title">Watto's Space Emporium</h1>
        </header>
      </div>
      <Router>
        <Switch>
          <Route exact path="/starships" component={Starships} />
          <Route path="/starships/:model" component={Starship} />
          <Route path="/about" component={About} />
          <Redirect to="/starships" />
        </Switch>
      </Router>
    </div>
  </ApolloProvider>
);

export default App;
