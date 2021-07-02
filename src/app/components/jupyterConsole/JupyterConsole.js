import React, { Component } from "react";
import ReactDOM from "react-dom";

class JupyterConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let zumiUrl = null;
    var hostName = window.location.protocol + "//" + window.location.hostname;
    zumiUrl = hostName + ":5555/notebooks/blockly.ipynb?out=true";

    global.ZUMI_URL = zumiUrl;

    document.getElementById("iframeJupyterConsole").src = zumiUrl;
  }

  render() {
    return (
      <div className="jupyter-console">
        <p>output: </p>
        <iframe id="iframeJupyterConsole" src="" />
      </div>
    );
  }
}

export default JupyterConsole;
