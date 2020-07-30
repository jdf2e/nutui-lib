const buildConfig = require('../webpack/nut-cli-build.config') ;
import { compileWebPack } from '../compiler/webpack';
const fs = require("fs");
const  merge = require("webpack-merge");
import Webpack from 'webpack';
import path = require('path')
interface userConfig{
	configureWebpack?:Webpack.Configuration
}
export async function build() { 
    const context = process.cwd();
	let userConfig:userConfig  = {}
	let config:Webpack.Configuration = buildConfig;
	const resolvedPath = path.resolve(context, 'nut.config.js')
	if (resolvedPath && fs.existsSync(resolvedPath)){ 
		userConfig = require(resolvedPath) 
		config = merge(buildConfig,userConfig.configureWebpack)
	} 
    compileWebPack(config)
}
