import React, { Component } from "react";
import ReactDOM from "react-dom";

class MasterWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let zumiUrl = null;
    var hostName = window.location.protocol + "//" + window.location.hostname;
    zumiUrl = hostName + ":5555/notebooks/blockly.ipynb";

    global.ZUMI_URL = zumiUrl;

    document.getElementById("iframeJupyter").src = zumiUrl;
  }

  render() {
    return (
      <div className="master-workspace">
        <div className="loader" />
        <iframe id="iframeJupyter" src="" />
      </div>
    );
  }
}

export default MasterWorkspace;
