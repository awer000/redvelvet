import React, { Component } from "react";
import "./App.css";
import data from "data.json";
import Template from "./components/Template";

class App extends Component {
  render() {
    return (
      <div>
        <Template data={data} />
      </div>
    );
  }
}

export default App;
