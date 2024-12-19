const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Вхідна точка вашого додатку
  output: {
    filename: "index.js", // Файл, який буде створено Webpack
    path: path.resolve(__dirname, "dist"), // Папка для збереження зібраного файлу
    clean: true, // Cleans old files in the `dist` folder
  },
  mode: "development", // Режим: development або production
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve files from `dist`
    port: 3000, // Default port for the dev server
    open: true, // Automatically opens the browser
    hot: true, // Enable Hot Module Replacement
    compress: true, // Enable gzip compression for faster loading
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Додаємо підтримку розширення .ts
  },
  module: {
    rules: [
      /*
        Out of the box, webpack only understands JavaScript and JSON files.
        Loaders allow webpack to process other types of files and convert 
        them into valid modules that can be consumed by your application 
        and added to the dependency graph
      */
      { test: /\.txt$/, use: "raw-loader" },
      /*
        Babel wasn't included in the webpack.config.js
        because we used TypeScript's own compiler (ts-loader) to handle the transpilation
        of TypeScript and JSX. This approach is perfectly valid for small projects,
        as ts-loader can transpile TypeScript and JSX to JavaScript on its own.
        However, Babel is often used alongside Webpack for React projects because
        it offers additional benefits that TypeScript alone does not. Here’s why
         you might want to use Babel in your Webpack setup, even with TypeScript:
      */
      // {
      //   test: /\.(ts|tsx|js|jsx)$/, // Handle TypeScript and JavaScript files
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader', // Use Babel for transpilation
      //     options: {
      //       presets: [
      //         '@babel/preset-env', // Transpile modern JavaScript
      //         '@babel/preset-react', // Transpile React JSX
      //         '@babel/preset-typescript', // Transpile TypeScript
      //       ],
      //     },
      //   },
      // },
      {
        test: /\.(ts|tsx)$/, // Усі файли з розширенням .ts
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
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
