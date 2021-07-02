global.runJS = function() {
  Code.runJS();
};

global.enablePlayButton = function() {
  $(".playButton").removeClass("disabled");
  $("#runButton").css("background-image", "url(images/icons/play.svg)");
};
