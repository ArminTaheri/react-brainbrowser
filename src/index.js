import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const testData = [
  {
    name: "structural1",
    type: "minc",
    header_url: "data/structural1.mnc.header",
    raw_data_url: "data/structural1.mnc.raw"
  },
  {
    name: "structural2",
    type: "minc",
    header_url: "data/structural2.mnc.header",
    raw_data_url: "data/structural2.mnc.raw"
  }
];

ReactDOM.render(<App volumes={testData} />, document.getElementById("root"));
registerServiceWorker();
