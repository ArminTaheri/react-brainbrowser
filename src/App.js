import React, { Component } from "react";
import { Grid, Row, Table, MenuItem, DropdownButton } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faArrowDown from "@fortawesome/fontawesome-free-solid/faArrowDown";
import VolumeViewer from "./components/VolumeViewer";
import "./css/bootstrap.min.css";
import "./App.css";

const ColormapDropdown = ({ index, activeColorMap, colorMaps, onSelect }) => (
  <DropdownButton id={`colormap-dropdown-${index}`} title={activeColorMap.name}>
    <MenuItem onClick={() => onSelect(null)}>none</MenuItem>
    {colorMaps.map((colorMap, index) => (
      <MenuItem key={index} onClick={() => onSelect(colorMap)}>
        {colorMap.name}
      </MenuItem>
    ))}
  </DropdownButton>
);

// Add Bootstrap stuff
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered: [], colorMaps: {}, overlay: true };
  }
  toggleVolume(volume) {
    const filtered = this.state.filtered.filter(v => v !== volume);
    if (this.state.filtered.includes(volume)) {
      this.setState({ filtered });
      return;
    }
    this.setState({ filtered: filtered.concat(volume) });
  }
  setColorMap(index, colorMap) {
    const { colorMaps } = this.state;
    Object.assign(colorMaps, { [index]: colorMap });
    this.setState({ colorMaps });
  }
  render() {
    const { filtered, overlay, colorMaps: stateColorMaps } = this.state;
    const { volumes, colorMaps } = this.props;
    return (
      <div className="App">
        <Grid>
          <Row style={{ textAlign: "left" }}>
            <Table bordered>
              <thead>
                <tr>
                  <th>Show</th>
                  <th>Colormap</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {volumes.map((volume, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        checked={filtered.includes(volume)}
                        onClick={() => this.toggleVolume(volume)}
                      />
                    </td>
                    <td>
                      <ColormapDropdown
                        index={i}
                        activeColorMap={stateColorMaps[i] || { name: "none" }}
                        colorMaps={colorMaps}
                        onSelect={colorMap => this.setColorMap(i, colorMap)}
                      />
                    </td>
                    <td>{volume.name}</td>
                    <td>{volume.type || "unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <div style={{ margin: "10px 0" }}>
              <input
                type="checkbox"
                checked={overlay}
                onChange={event => {
                  this.setState({ overlay: event.target.checked });
                }}
              />
              Overlay Volumes?
            </div>
          </Row>
          <Row>
            <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon
                style={{ margin: "0 10px" }}
                icon={faArrowDown}
              />
              Checked files passed as react props
              <FontAwesomeIcon
                style={{ margin: "0 10px" }}
                icon={faArrowDown}
              />
            </div>
          </Row>
          <Row>
            <VolumeViewer
              volumes={filtered.map((volume, i) => ({
                colormap: stateColorMaps[i],
                ...volume
              }))}
              overlay={overlay}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
