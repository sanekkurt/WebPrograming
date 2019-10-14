import * as React from "react";
import { render } from "react-dom";
import WeatherWidget from "./WeatherWidget";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <WeatherWidget />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
