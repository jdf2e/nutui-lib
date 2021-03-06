import Webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { VueLoaderPlugin } from 'vue-loader';
import { ROOT_CLI_PATH, ROOT_PACKAGE_PATH } from '../util/dic';
import { isDev, isTest } from '../util';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const nutui_config = require(ROOT_PACKAGE_PATH('package.json'));
const nutui_cli_config = require(ROOT_CLI_PATH('package.json'));
export const baseConfig: Webpack.Configuration = {
	stats: 'errors-only',
	output: {
		publicPath: './' //相对路径
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': ROOT_PACKAGE_PATH('src')
		},
		symlinks: false
	},
	module: {
		rules: [
			isTest()
				? {}
				: {
					test: /\.(sa|sc|c)ss$/,
					use: [
						isDev() ? 'style-loader' : {
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: '../',
							},

						},
						'css-loader',
						'postcss-loader',
						{
							loader: 'sass-loader',
							options: {
								prependData: `@import "@/styles/index.scss"; `
							}
						}
					]
				},
			{
				test: /\.vue$/,
				use: [
					'cache-loader',
					{
						loader: 'vue-loader',
						options: {
							loaders: {
								sass: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				include: [ROOT_PACKAGE_PATH('src'), ROOT_CLI_PATH('site')],
				use: ['cache-loader', 'babel-loader']
			},
			{
				test: /\.(png|jpe?g|gif|webp)$/,
				loader: 'url-loader',
				include: [ROOT_PACKAGE_PATH('src/assets/img'), ROOT_CLI_PATH('site')],
				options: {
					limit: 3000,
					name: 'img/[name].[ext]',
					esModule: false // 否则加载时为 [object]
				}
			},
			{
				test: /\.svg$/,
				loader: 'raw-loader',
				include: [ROOT_PACKAGE_PATH('src/assets/svg')],
				options: {
					esModule: false // 否则加载时为 [object]
				}
			}
		]
	},
	plugins: [
		new Webpack.BannerPlugin({
			banner: `${nutui_config.name} v${nutui_config.version} - [filebase], [hash], ${new Date()}
(c) 2017-2020 JDC
Released under the MIT License.`
		}),
		new VueLoaderPlugin(),
		new WebpackBar({
			name: `NutUI CLI v${nutui_cli_config.version}`,
			color: '#5396ff'
		})
	]
};
