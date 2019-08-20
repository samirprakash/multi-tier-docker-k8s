import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import Fib from "./components/fib/fib.component";
import OtherPage from "./components/other-page/other-page.component";
import logo from "./logo.svg";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>
          <Link to="/other-page">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/other-page" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
