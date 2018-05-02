import React, { Component } from "react";
import "third-party/brainbrowser-2.5.5/brainbrowser.volume-viewer.min.js";

/* eslint-disable no-undef */

class VolumeViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.divRef = React.createRef();
    this.viewer = null;
  }
  componentDidMount() {
    BrainBrowser.VolumeViewer.start(this.divRef.current, viewer => {
      this.viewer = viewer;
      viewer.addEventListener("volumesloaded", () => {
        this.setState({ loading: false });
        this.props.volumes.forEach((volume, i) => {
          console.log(volume, i);
          if (volume.colormap) {
            viewer.loadVolumeColorMapFromURL(i, volume.colormap.url);
          }
        });
        setTimeout(() => {
          viewer.redrawVolumes();
          viewer.resetDisplays();
        }, 50);
      });
      this.updateViewerWithProps(this.props);
      viewer.render();
    });
  }
  componentWillReceiveProps(nextProps) {
    this.updateViewerWithProps(nextProps);
  }
  updateViewerWithProps(props) {
    if (!this.viewer) {
      return;
    }
    let overlay;
    if (props.overlay) {
      overlay = {};
    }
    const { volumes, colormap, cursorColor } = props;
    this.viewer.loadDefaultColorMapFromURL(colormap, cursorColor);
    this.viewer.clearVolumes();
    this.viewer.loadVolumes({ volumes, overlay });
    this.setState({ loading: volumes.length > 0 });
  }
  render() {
    return (
      <div>
        {this.state.loading ? <this.props.renderLoading /> : null}
        <div ref={this.divRef} />
      </div>
    );
  }
}

VolumeViewer.defaultProps = {
  volumes: [],
  cursorColor: "#FF0000",
  colormap: "data/color-maps/gray-scale.txt",
  renderLoading: () => <div>"Loading..."</div>
};

export default VolumeViewer;
