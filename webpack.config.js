const path = require("path");
var WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
  entry: "./src/app/index.js",
  output: {
    filename: "./app/ble-lib/bundle.js",
    path: path.resolve(__dirname, "src")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new WebpackAutoInject({
      // specify the name of the tag in the outputed files eg
      // bundle.js: [SHORT]  Version: 0.13.36 ...
      SHORT: "CUSTOM",
      SILENT: false,
      PACKAGE_JSON_PATH: "./package.json",
      PACKAGE_JSON_INDENT: 4,
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: true,
        InjectByTag: true
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: true // it will increase version with every single build!
        },
        InjectAsComment: {
          tag: "Version: {version} - {date}",
          dateFormat: "h:MM:ss TT", // change timezone: `UTC:h:MM:ss` or `GMT:h:MM:ss`
          multiLineCommentType: false // use `/** */` instead of `//` as comment block
        },
        InjectByTag: {
          fileRegex: /\.+/,
          // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
          // but also you can change [AIV] tag to anything you want
          AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
          dateFormat: "h:MM:ss TT"
        }
      },
      LOGS_TEXT: {
        AIS_START: "Blockly for Robolink started"
      }
    })
  ]
};
