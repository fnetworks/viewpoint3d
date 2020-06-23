const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	entry: './src/renderer.js',
	output: {
		filename: 'index.js',
		path: outputPath
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
	devServer: {
		contentBase: outputPath,
	}
};
