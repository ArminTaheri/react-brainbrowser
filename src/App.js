import React, { Component } from "react";
import { Grid, Row, Table } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faArrowDown from "@fortawesome/fontawesome-free-solid/faArrowDown";
import VolumeViewer from "./components/VolumeViewer";
import "./css/bootstrap.min.css";
import "./App.css";

// Add Bootstrap stuff
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered: [], overlay: true };
  }
  toggleVolume(volume) {
    const filtered = this.state.filtered.filter(v => v !== volume);
    if (this.state.filtered.includes(volume)) {
      this.setState({ filtered });
      return;
    }
    this.setState({ filtered: filtered.concat(volume) });
  }
  render() {
    const { filtered, overlay } = this.state;
    const { volumes } = this.props;
    return (
      <div className="App">
        <Grid>
          <Row style={{ textAlign: "left" }}>
            <Table bordered>
              <thead>
                <tr>
                  <th>Show</th>
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
                onClick={() => {
                  this.setState({ overlay: !overlay });
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
            <VolumeViewer volumes={filtered} overlay={overlay} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
