const webpack = require('webpack')

module.exports = {
	// Your existing Webpack configuration...
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
}
