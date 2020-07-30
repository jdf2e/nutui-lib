import webpack = require("webpack");
const path = require("path");
const MinicssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const htmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const moment = require("moment");
const Carefree = require("@nutui/carefree");
const WebpackUploadPlugin = require("@nutui/upload/webpackUploadPlugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackConfig = {
  mode: "development",
  entry: {
    index: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "build/"),
  },
  stats: {
    entrypoints: false,
    children: false,
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      "@": path.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              data: '@import "./src/asset/css/common-mixin.scss";',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp|woff|eot|ttf|ico)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "img/[name].[ext]",
            limit: 2000,
          },
        },
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                css: ["vue-style-loader", "css-loader", "sass-loader"],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src"),
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /jssdk.min.js/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.html$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /<!-- @version -->/gi,
              replacement: function() {
                return "";
              },
            },
            {
              pattern: /<!-- @vendorVersion -->/gi,
              replacement: function() {
                return "";
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MinicssExtractPlugin({
      filename: "css/[name].css",
    }),
    // new PurgecssPlugin({
    //     paths: glob.sync(path.resolve(__dirname, 'src/**/*'),  { nodir: true }),
    // }),
    new StringReplacePlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)$/g,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true,
        autoprefixer: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: path.resolve(__dirname, "build/index.html"),
      inject: true,
    }),
  ],
  devServer: {
    index: "index.html",
  },

 
};
module.exports = webpackConfig;
