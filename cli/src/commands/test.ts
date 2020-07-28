import { setNodeEnv } from '../util';
import { resolve } from 'path';
const {spawn} = require('child_process');
 
export function test(env:Object,options:Array<String>) { 
	setNodeEnv('test');  
	const componentName = options && options[0]
	const param = [
		'mocha-webpack',
		'--webpack-config',
		resolve(__dirname, '../webpack/test.config.js'), 
		'--require',
		resolve(__dirname, '../test/setup.js'),
		`src/packages/${ componentName || '*'}/__test__/${componentName || '**'}.spec.js`
	]
 	const ls = spawn('nyc',param,{stdio:'inherit'});
	ls.on('close', (code:any) => {
		process.exit(); 
	});
}
