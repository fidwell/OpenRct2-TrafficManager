import path from "path";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const outputDir =
  process.env.OPENRCT2_PLUGIN_PATH ||
  path.join(process.env.USERPROFILE || "C:", "Documents", "OpenRCT2", "plugin");

export default {
  input: "./src/registerPlugin.ts",
  output: {
    file: path.join(outputDir, "TrafficManager.js"),
    format: "iife",
  },
  plugins: [
    replace({
      include: "./src/environment.ts",
      preventAssignment: true,
      values: {
        __BUILD_CONFIGURATION__: JSON.stringify("development")
      }
    }),
    typescript(),
    terser({
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble: "// Mod powered by https://github.com/wisnia74/openrct2-typescript-mod-template - MIT license",
      },
    }),
  ],
};
