import React, { Component } from "react";
import ReactDOM from "react-dom";

class SelectDevice extends React.Component {
  constructor(props) {
    super(props);
    var paramGetZumi = location.search.split("zumi=")[1];
    var deviceType = paramGetZumi ? "codrone" : "zumi";
    this.state = { typeDevice: deviceType };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleChange({ target: { value: "zumi" } });
    setTimeout(
      function() {
        let currentTab = "#" + global.ZUMI_CURRENT_VIEW + "XmlBtn";
        $(currentTab).trigger("click");
      }.bind(this),
      400
    );
  }

  handleChange(el) {
    global.DEVICE_TYPE = el.target.value;
    $.event.trigger({
      type: "OnMasterToolboxDeviceChange",
      message: ""
    });
    let currentTab = "#" + global.ZUMI_CURRENT_VIEW + "XmlBtn";
    $(currentTab).trigger("click");
  }

  render() {
    const selectedOptionId = 0;
    return (
      <div style={{ height: "88px" }}>
        <select
          onChange={this.handleChange}
          defaultValue={this.state.typeDevice}
        >
          <option value="codrone">CoDrone</option>
          <option value="zumi">Zümi</option>
        </select>
      </div>
    );
  }
}

export default SelectDevice;
