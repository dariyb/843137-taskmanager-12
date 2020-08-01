const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `soutce-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
  }
};
