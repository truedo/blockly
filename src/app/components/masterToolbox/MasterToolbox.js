import React, { Component } from "react";
import ReactDOM from "react-dom";

class MasterToolbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { typeDevice: "codrone", deviceType: 1 };
    this.toggleOption = this.toggleOption.bind(this);
    this.toggleFromIcon = this.toggleFromIcon.bind(this);
  }
  componentDidMount() {
    this.toggleOption = this.toggleOption.bind(this);
    $(document).on(
      "OnMasterToolboxDeviceChange",
      function() {
        if (global.DEVICE_TYPE === "zumi") {
          this.setState({ deviceType: 2 });
        } else {
          this.setState({ deviceType: 1 });
        }
      }.bind(this)
    );
  }

  toggleOption(el) {
    var ul = el.target.parentElement;
    var li = ul.getElementsByTagName("li");
    var span = li[0].parentElement.getElementsByTagName("span");

    if (span[0].classList[2] === "glyphicon-triangle-bottom") {
      span[0].classList.remove("glyphicon-triangle-bottom");
      span[0].classList.add("glyphicon-triangle-top");
    } else {
      span[0].classList.remove("glyphicon-triangle-top");
      span[0].classList.add("glyphicon-triangle-bottom");
    }
    for (var i = 0; i < li.length; i++) {
      if (span[0].classList[2] === "glyphicon-triangle-bottom") {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  toggleFromIcon(el) {
    var elementDivContainer = { target: el.target.parentElement };
    this.toggleOption(elementDivContainer);
  }

  render() {
    if (this.state.deviceType == 1) {
      return (
        <div className="master-toolbox">
          <ul>
            <div onClick={this.toggleOption}>
              Connection
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>disconnect()</li>
            <li style={{ display: "none" }}>pair()</li>
            <li style={{ display: "none" }}>calibrate()</li>
          </ul>
          <ul>
            <div>
              {" "}
              Flight Commands (Start/Stop){" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
          <ul>
            <div>
              {" "}
              Flight Commands (Movements){" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
          <ul>
            <div>
              {" "}
              Flight Variables{" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
          <ul>
            <div>
              {" "}
              LED{" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
          <ul>
            <div>
              {" "}
              Status checkers{" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
          <ul>
            <div>
              {" "}
              Sensors{" "}
              <span className="pull-right glyphicon glyphicon-triangle-top" />
            </div>
          </ul>
        </div>
      );
    }
    if (this.state.deviceType == 2) {
      return (
        <div className="master-toolbox">
          <ul>
            <div onClick={this.toggleOption}>
              Engine
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>turn_degree()</li>
            <li style={{ display: "none" }}>turn_left()</li>
            <li style={{ display: "none" }}>turn_right()</li>
            <li style={{ display: "none" }}>forward()</li>
            <li style={{ display: "none" }}>reverse()</li>
            <li style={{ display: "none" }}>stop()</li>
          </ul>
          <ul>
            <div onClick={this.toggleOption}>
              Infrared
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>get_distance()</li>
          </ul>
          <ul>
            <div onClick={this.toggleOption}>
              Audio
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>play_sound()</li>
          </ul>
          <ul>
            <div onClick={this.toggleOption}>
              Personality
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>act()</li>
          </ul>
          <ul>
            <div onClick={this.toggleOption}>
              Computer Vision
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>face_detected()</li>
            <li style={{ display: "none" }}>track_face()</li>
          </ul>
          <ul>
            <div onClick={this.toggleOption}>
              Deep Learning
              <span
                onClick={this.toggleFromIcon}
                className="pull-right glyphicon glyphicon-triangle-top"
              />
            </div>
            <li style={{ display: "none" }}>smile_detected()</li>
            <li style={{ display: "none" }}>collect_smile()</li>
          </ul>
        </div>
      );
    }
  }
}

export default MasterToolbox;
