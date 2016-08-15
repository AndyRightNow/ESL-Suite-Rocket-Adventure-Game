var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var PROJECT_NAME = 'game';
var HTML_TEST = 'htmltest';
var PROJECT_ENTRY = './src/game/game';
var HTML_TEST_ENTRY = './test/htmltest/' + HTML_TEST;

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: debug ? HTML_TEST_ENTRY : PROJECT_ENTRY,
  output: {
    path: __dirname + (debug ? '/test/htmltest/' : '/dist/'),
    filename: (debug ? HTML_TEST + '.dist' : PROJECT_NAME + '.min') + '.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),    //  Stripe out duplicate codes
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
