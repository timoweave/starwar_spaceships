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
import {Link} from "./utils";

import "./App.css";

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Router>
        <div>
          <header className="App-header">
            <h1 className="App-title">
              <Link to="/about">Watto's Space Emporium</Link>
            </h1>
          </header>
          <Switch>
            <Route exact path="/starships" component={Starships} />
            <Route path="/starships/:model" component={Starship} />
            <Route path="/about" component={About} />
            <Redirect to="/starships" />
          </Switch>
        </div>
      </Router>
    </div>
  </ApolloProvider>
);

export default App;
