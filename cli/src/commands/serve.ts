const devConfig = require('../webpack/nut-cli-dev.config') ;
const path = require('path')
const fs = require("fs");
const  merge = require("webpack-merge");
import Webpack from 'webpack';
import { prodConfig } from '../webpack/prod.config';
import { compileWebPack } from '../compiler/webpack';

interface userConfig{
	configureWebpack?:Webpack.Configuration
}
export function serve(env:Object,options:Array<String>) {
	const context = process.cwd();
	let userConfig:userConfig  = {}
	let config:Webpack.Configuration = devConfig;
	const resolvedPath = path.resolve(context, 'nut.config.js')
	if (resolvedPath && fs.existsSync(resolvedPath)){ 
		userConfig = require(resolvedPath) 
		config = merge(devConfig,userConfig.configureWebpack)
	} 
	compileWebPack(config) 
}

 
