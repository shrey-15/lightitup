import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreetNode from "./components/StreetNode";
import Nodes from "./components/Nodes";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/node/:id" exact component={StreetNode} />
        <Route path="/" component={Nodes} />
      </Switch>
    </Router>
  );
}

export default App;
