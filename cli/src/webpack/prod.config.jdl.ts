import Webpack from 'webpack';
import merge from 'webpack-merge';
import { devConfig } from './dev.config';
import { ROOT_PACKAGE_PATH, ROOT_CLI_PATH } from '../util/dic';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
export const prodConfig: Webpack.Configuration = merge(devConfig, {
	mode: 'production',
	output: {
		path: ROOT_PACKAGE_PATH('dist/jdl'),
		filename: 'js/[name].[hash].bundle.min.js',
		chunkFilename: 'js/[name].[chunkhash].chunk.min.js'
	},
	optimization: {
		minimize: true,
		splitChunks:{
            automaticNameDelimiter: '_',
        }
	},
	plugins: [
		new OptimizeCSSAssetsPlugin(),
		new CopyWebpackPlugin([
			{
				from: ROOT_CLI_PATH('site/demo/asset/img/favicon.ico'),
				to: ROOT_PACKAGE_PATH('dist/jdl/')
			}
		]),
		new CopyWebpackPlugin([
			{
				from: ROOT_CLI_PATH('site/demo/asset/img/pwa_logo.png'),
				to: ROOT_PACKAGE_PATH('dist/jdl/img/')
			}
		]),
	]
});
