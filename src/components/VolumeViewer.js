import React, { Component } from "react";
import "third-party/brainbrowser-2.5.5/brainbrowser.volume-viewer.min.js";

/* eslint-disable no-undef */

class VolumeViewer extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.viewer = null;
  }
  componentDidMount() {}
  render() {
    return <div ref={this.divRef} />;
  }
}

export default VolumeViewer;
