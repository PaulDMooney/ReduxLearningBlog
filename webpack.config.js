module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devTool: "source-map",
  module: {
    loaders: [
      { test: /\.tsx?$/, 
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
       },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json','.ts', '.tsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
