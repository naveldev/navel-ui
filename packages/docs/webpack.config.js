const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: "development",
	entry: "./src/js/app.js",

	// compilation configuration
	output: {
		path: path.join(__dirname, "./docs"),
		filename: "bundle.js",
		publicPath: "/"
	},

	// webpack-dev-server configuration
	devServer: {
		static: {
			contentBase: path.join(__dirname, '../../docs'),
		},
		compress: true,
		port: 3000,
		historyApiFallback: true
	},

	// folder aliases
	resolve: {
		alias: {
			'@components': path.join(__dirname, './src/js/components'),
			'@containers': path.join(__dirname, './src/js/containers'),
			'@utils': path.join(__dirname, './src/js/utils'),
			'@': path.join(__dirname, './src')
		},
	},
	
	module: {
		rules: [
			// vue-loader
			{
				test: /\.vue$/,
				use: "vue-loader"
			},

			// css-loader to bundle all the css files into one file and vue-style-loader
			// to add all the styles inside the <style> block in `.vue` file.
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					// Translates CSS into CommonJS
					"css-loader"
				]
			},

			// sass-loader
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},

			// use @babel for ES6 support
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
		]
	},

	plugins: [
		// copy public to docs
		new CopyPlugin({
			patterns: [
				{
					from: path.join(__dirname, './public'),
					to: path.join(__dirname, './docs')
				},
			],
		}),
		// make sure to include the plugin for the magic
		new VueLoaderPlugin()
	]
}