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

const colorMaps = [
  {
    name: "blue",
    url: "data/color-maps/blue.txt"
  },
  {
    name: "gray-scale",
    url: "data/color-maps/gray-scale.txt"
  },
  {
    name: "green",
    url: "data/color-maps/green.txt"
  },
  {
    name: "spectral-brainview",
    url: "data/color-maps/spectral-brainview.txt"
  },
  {
    name: "spectral",
    url: "data/color-maps/spectral.txt"
  },
  {
    name: "thermal",
    url: "data/color-maps/thermal.txt"
  }
];

ReactDOM.render(
  <App volumes={testData} colorMaps={colorMaps} />,
  document.getElementById("root")
);
registerServiceWorker();
