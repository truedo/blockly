import React, { Component } from "react";
import ReactDOM from "react-dom";
import { eventManager } from "../../lib/eventManager.js";
import { keyPressManager } from "../../lib/keyPressManager.js";
import { commandManager } from "../../lib/commandManager.js";

class Burger extends React.Component {
  constructor(props) {
    super(props);
    var paramGet = location.search.split("debug=")[1];
    this.state = {
      isToggleOn: true,
      debug: paramGet
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.handleProgramFinish = this.handleProgramFinish.bind(this);
  }

  handleRestartClick() {
    if (global.DEVICE_TYPE === "zumi") {
      var codeString = ZUMI_IMPORT_STATEMENT;
      codeString = codeString + Blockly.Python.workspaceToCode(Code.workspace);
      var encodedString = window.btoa(unescape(encodeURIComponent(codeString)));

      var jupyterConsoleFrame = document.getElementById("iframeJupyterConsole")
        .contentWindow;
      jupyterConsoleFrame.postMessage(encodedString + "RESTART=TRUE", "*");
      return;
    }
  }

  handleClick(el) {
    var menuElement = el.target.parentElement.parentElement.getElementsByClassName(
      "menu"
    )[0];
    menuElement.classList.toggle("active");
  }

  handleSaveClick(el) {
    el.preventDefault();
    var filename = prompt("File name: ");
    if (filename == null || filename == "") {
    } else {
      var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      localStorage.setItem("coDrone", Blockly.Xml.domToText(xml));
      Code.createAndOpenFile(filename, xml);
      Code.showNotification("Success.");
    }
  }

  handleOpenClick(el) {
    el.preventDefault();
    document.getElementById("file-input").click();
  }

  handleUndoRedoClick(el) {
    el.preventDefault();
    var action = el.target.parentElement.dataset.actionButton;

    if (action == "redo") {
      Code.workspace.undo(true);
    } else {
      Code.workspace.undo();
    }
  }

  handleForceLanding(el, skipLanding, eventChange) {
    eventManager.removeAllEvents();

    global.stopExecution(skipLanding);

    if (skipLanding && keyPressManager.hasKeyEventsAttached()) {
      return;
    }

    if (skipLanding && global.DISPLAY_INTERVAL && !eventChange) {
      global.RUNNING = true;
      global.RUN_ONLY_DISPLAY_BLOCKS = true;
      return;
    }

    if (!eventChange) {
      if (global.blocksSaved && global.blocksSaved.length > 0) {
        for (var i = 0; i < global.blocksSaved.length; i++) {
          console.log(
            "interval to be remove: ",
            global.blocksSaved[i].blockInterval
          );
          if (global.blocksSaved[i].blockInterval) {
            clearInterval(global.blocksSaved[i].blockInterval);
          }
        }
      }

      global.blockInterval = null;
      global.RUN_ONLY_DISPLAY_BLOCKS = false;
      global.DISPLAY_INTERVAL = false;
    }
    keyPressManager.removeKeyPressEvents();

    if ($(".playButton").hasClass("disabled")) {
      global.enablePlayButton();
    }
  }

  handleStopClick(el, skipLanding, eventChange) {
    if (global.DEVICE_TYPE === "zumi") {
      var codeString = ZUMI_IMPORT_STATEMENT;
      codeString = codeString + Blockly.Python.workspaceToCode(Code.workspace);
      var encodedString = window.btoa(unescape(encodeURIComponent(codeString)));

      var jupyterConsoleFrame = document.getElementById("iframeJupyterConsole")
        .contentWindow;
      jupyterConsoleFrame.postMessage(encodedString + "STOP=TRUE", "*");
      return;
    }
    eventManager.removeAllEvents();

    global.stopExecution(false);

    setTimeout(
      async function() {
        await global.emergencyStopInternal(true);
      }.bind(this),
      100
    );

    if (global.blocksSaved && global.blocksSaved.length > 0) {
      for (var i = 0; i < global.blocksSaved.length; i++) {
        console.log(
          "interval to be remove: ",
          global.blocksSaved[i].blockInterval
        );
        if (global.blocksSaved[i].blockInterval) {
          clearInterval(global.blocksSaved[i].blockInterval);
        }
      }
    }

    global.blockInterval = null;
    global.RUN_ONLY_DISPLAY_BLOCKS = false;
    global.DISPLAY_INTERVAL = false;

    keyPressManager.removeKeyPressEvents();

    if ($(".playButton").hasClass("disabled")) {
      global.enablePlayButton();
    }
  }

  handleRunClick(el) {
    if (global.DEVICE_TYPE === "zumi") {
      var codeString = ZUMI_IMPORT_STATEMENT;
      codeString = codeString + Blockly.Python.workspaceToCode(Code.workspace);
      var encodedString = window.btoa(unescape(encodeURIComponent(codeString)));

      var jupyterConsoleFrame = document.getElementById("iframeJupyterConsole")
        .contentWindow;
      jupyterConsoleFrame.postMessage(encodedString + "RUN=TRUE", "*");
      return;
    }

    if (!Code.device && !this.state.debug) {
      //alert("CoDrone is not connected!");
      return;
    }
    if ($(".playButton").hasClass("disabled")) {
      global.enablePlayButton();
      return;
    } else {
      $(".playButton").addClass("disabled");
    }

    global.RUNNING = true;
    Code.runJS();
  }

  componentDidMount() {
    var version = "[AIV]{version}[/AIV]";
    //alert(version);
    $("#appVersion").html(version);
    $(document).on(
      "stopExternalEvent",
      function() {
        this.handleProgramFinish();
      }.bind(this)
    );

    $(document).on(
      "eventChangeExternalEvent",
      function() {
        //this.handleForceLanding(null, true, true);
      }.bind(this)
    );
  }

  handleProgramFinish() {
    if (global.DISPLAY_INTERVAL) {
      global.RUNNING = true;
      global.RUN_ONLY_DISPLAY_BLOCKS = true;
      return;
    }

    if (global.blocksSaved && global.blocksSaved.length > 0) {
      for (var i = 0; i < global.blocksSaved.length; i++) {
        console.log(
          "interval to be remove: ",
          global.blocksSaved[i].blockInterval
        );
        if (global.blocksSaved[i].blockInterval) {
          clearInterval(global.blocksSaved[i].blockInterval);
        }
      }
    }

    global.blockInterval = null;
    global.RUN_ONLY_DISPLAY_BLOCKS = false;
    global.DISPLAY_INTERVAL = false;
    setTimeout(
      async function() {
        global.enablePlayButton();
      }.bind(this),
      4800
    );
  }

  render() {
    return (
      <div className="interactive-menu-button">
        <a href="#" onClick={this.handleClick}>
          <span>Menu</span>
        </a>
        <div className="menu">
          <ul>
            <a id="saveWorkspaceBtn" href="#" onClick={this.handleSaveClick}>
              <li>Save</li>
            </a>
            <a id="openWorkspace" href="#" onClick={this.handleOpenClick}>
              <li>Open...</li>
            </a>
            <a href="">
              <li>New</li>
            </a>
            <li className="separator" />
            <a href="#" id="undoButton" onClick={this.handleUndoRedoClick}>
              <li>Undo</li>
            </a>
            <a
              href="#"
              id="redoButton"
              data-action-button="redo"
              onClick={this.handleUndoRedoClick}
            >
              <li>Redo</li>
            </a>
            <li className="version-label">
              <small>
                Ver <span id="appVersion" />
              </small>
            </li>
          </ul>
        </div>
        <div className="forceLanding">
          <button
            type="button"
            id="forceLanding"
            onClick={this.handleStopClick}
            className="btn btn-danger navbar-btn"
          />
          <span>Stop</span>
        </div>
        <div className="playButton iddle">
          <button
            type="button"
            id="runButton"
            onClick={this.handleRunClick}
            className="btn btn-danger navbar-btn"
          />
          <span className="not-running">Run code</span>
          <span className="running">Code running..</span>
        </div>
      </div>
      // <div className="restartButton">
      //   <button
      //     type="button"
      //     id="restartButton"
      //     onClick={this.handleRestartClick}
      //     className="btn btn-danger navbar-btn"
      //   />
      //   <span> Restart </span>
      // </div>
    );
  }
}

export default Burger;
