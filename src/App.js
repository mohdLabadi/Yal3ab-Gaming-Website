import Games from "./Games/Games";
import "./App.css";
import HomePage from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const currentUserInfo = createContext();

function App() {
  const [userName, setUserName] = useState("Guest");
  const [useScore, setUserScore] = useState(0);

  return (
    <currentUserInfo.Provider
      value={{ userName, setUserName, useScore, setUserScore }}
    >
      <Router>
        <nav className="navbar navbar-expand navbar-dark site-nav">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/img/Yal3ab.png"
                className="logo-image"
                alt="Yal3ab"
              />
              <span className="brand-text">Yal3ab</span>
            </a>

            <ul className="navbar-nav ms-auto player-stats">
              <li className="nav-item">
                <div className="score">
                  <h5>Score: {useScore}</h5>
                </div>
              </li>
              <li className="nav-item">
                <div className="score">
                  <h5>Player: {userName}</h5>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="color-stripe" aria-hidden="true">
          <div className="box-sm orange"></div>
          <div className="box-sm green"></div>
          <div className="box-sm yellow"></div>
          <div className="box-sm lime"></div>
        </div>

        <main className="site-main">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/game/:type">
              <Games />
            </Route>
          </Switch>
        </main>
      </Router>
    </currentUserInfo.Provider>
  );
}

export default App;
