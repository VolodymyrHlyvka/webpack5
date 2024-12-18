const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Вхідна точка вашого додатку
  output: {
    filename: "main.js", // Файл, який буде створено Webpack
    path: path.resolve(__dirname, "dist"), // Папка для збереження зібраного файлу
  },
  mode: "development", // Режим: development або production
  module: {
    rules: [
      /*
        Out of the box, webpack only understands JavaScript and JSON files.
        Loaders allow webpack to process other types of files and convert 
        them into valid modules that can be consumed by your application 
        and added to the dependency graph
      */
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.js$/, // Усі JS-файли
        exclude: /node_modules/, // Виключаємо папку node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Використовуємо Babel
          },
        },
      },
    ],
  },
  /*
    While loaders are used to transform certain types of modules,
    plugins can be leveraged to perform a wider range of tasks 
    like bundle optimization, asset management and injection of environment variables.
  */
  plugins: [new HtmlWebpackPlugin({ template: "./dist/index.html" })],
};
