import * as Environment from "./environment";
import main from "./main";

registerPlugin({
  name: Environment.pluginName,
  version: Environment.pluginVersion,
  authors: Environment.pluginAuthors,
  type: "remote",
  licence: "MIT",
  targetApiVersion: 70,
  main
});
