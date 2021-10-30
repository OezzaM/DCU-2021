import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import history from "./helpers/history";
import StartButton from "./components/StartButton/StartButton";
import Home from "./pages/Home/Home";
import background from "./assets/background.jpg";
import caballo from "./assets/animales/caballo.png";
import perro from "./assets/animales/perro.png";
import elefante from "./assets/animales/elefante.png";
import delfin from "./assets/animales/delfin.png";
import chimpance from "./assets/animales/chimpance.png";
import PageAnimal from "./pages/PageAnimal/PageAnimal";

function App() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    localStorage.setItem("buttonActive", JSON.stringify(false));
    localStorage.setItem(
      "animales",
      JSON.stringify([
        {
          id: 1,
          name: "CABALLO",
          image: caballo,
          style: { width: "360px" },
          sonido: ["https://www.mboxdrive.com/animals036.mp3"],
          grabacion: null,
        },
        {
          id: 2,
          name: "PERRO",
          image: perro,
          style: { width: "250px" },
          sonido: ["https://www.mboxdrive.com/0005257.mp3"],
          grabacion: null,
        },
        {
          id: 3,
          name: "ELEFANTE",
          image: elefante,
          style: { width: "300px" },
          sonido: ["https://www.mboxdrive.com/ELEPHANT.mp3"],
          grabacion: null,
        },
        {
          id: 4,
          name: "DELFÍN",
          image: delfin,
          style: { width: "300px" },
          sonido: ["https://www.mboxdrive.com/0004444.mp3"],
          grabacion: null,
        },
        {
          id: 5,
          name: "CHIMPANCE",
          image: chimpance,
          style: { width: "300px" },
          sonido: ["https://www.mboxdrive.com/0000947.mp3"],
          grabacion: null,
        },
      ])
    );
  }, []);

  useEffect(() => {
    setHidden(JSON.parse(localStorage.getItem("buttonActive")));
  }, [localStorage.getItem("buttonActive")]);
  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <div>
                <StartButton
                  className={hidden ? "hidden" : "block"}
                  onClick={setHidden}
                />
                <Home
                  className={!hidden ? "hidden" : "block min-h-screen"}
                  animales={localStorage.getItem("animales")}
                />
              </div>
            )}
          />
          <Route path="/animal/:id" exact component={PageAnimal} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
