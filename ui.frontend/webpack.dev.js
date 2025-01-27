const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SOURCE_ROOT = __dirname + "/src/main/webpack";

const bypassAlreadyProxiedRequests = {
  xfwd: true,
  bypass: (req) => {
    if (req.headers["x-forwarded-for"] !== undefined) {
      return req.path;
    }
  },
};

module.exports = (env) => {
  return merge(common, {
    mode: "development",
    performance: {
      hints: "warning",
      maxAssetSize: 1048576,
      maxEntrypointSize: 1048576,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SOURCE_ROOT + "/static/index.html"),
      }),
    ],
    devServer: {
      port: 8080,
      proxy: [
        {
          context: "/etc.clientlibs/wknd",
          target: "http://localhost:8080",
          pathRewrite: {
            [`/etc.clientlibs/wknd/clientlibs/clientlib-([a-zA-Z0-9-]+)?(\\.lc-[a-z0-9]+-lc)?(\\.min)?\\.([a-z]+)`]:
              "/clientlib-$1/$1.$4",
          },
          ...bypassAlreadyProxiedRequests,
        },
        {
          context: () => true,
          target: "http://localhost:4502",
          ...bypassAlreadyProxiedRequests,
        },
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      watchFiles: ["src/**/*"],
      hot: false,
      devMiddleware: {
        writeToDisk: true,
      },
    },
  });
};
