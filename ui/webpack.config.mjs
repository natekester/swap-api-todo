import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import { createRequire } from "node:module";
import * as url from "url";

const require = createRequire(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve("./src");
const dist = path.resolve("./dist");
const node_modules = path.resolve("./node_modules");

export default (env, argv) => {
  const config = {
    mode: "development",
    entry: { bundle: path.resolve(src, "entry.jsx") },
    resolve: {
      alias: { src },
      extensions: ["*", ".js", ".jsx", ".css"],
      modules: [__dirname, "node_modules"],
    },
    output: {
      path: dist,
      filename: "[name].[chunkhash].js",
      publicPath: "",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      // allowedHosts: ["natekester.com"],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      // onBeforeSetupMiddleware: (devServer) => {
      //devserver.app.use(middleware) -> such as setting security headers
      // },
      headers: {
        // "Access-Control-Allow-Origin": "https://whitelistedsite.com"
        "X-Content-Type-Options": "nosniff",
      },
      // host: "0.0.0.0",
      port: 443,
      proxy: [
        {
          context: ["/api"],
          target: "http://api:8000", //may want to make port an env variable
        },
      ],
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      },
      static: {
        directory: dist,
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [/\/server\//],
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "postcss-loader" },
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: (resourcePath) => {
                    return resourcePath.includes(".module.")
                      ? "local"
                      : "global";
                  },
                  localIndentName: "[local]__[hash:base64:5]",
                },
              },
            },
          ],
          include: [path.resolve(src)],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser.js",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        chuncks: ["bundle"],
        inject: "head",
        scriptLoading: "defer",
      }),
    ],
  };

  return config;
};
