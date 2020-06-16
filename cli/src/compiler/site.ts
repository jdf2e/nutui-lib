import { devConfig } from '../webpack/dev.config';
import { prodConfig } from '../webpack/prod.config';
import { prodConfig as prodConfig3x } from '../webpack/prod.config.v3';
import { compileWebPack } from './webpack';
import logger from '../util/logger';
export async function compileSite(prod: boolean = false) {
	try {
		prod ? await compileWebPack(process.env.NUTUI_VERSION == "2" ? prodConfig : prodConfig3x) : compileWebPack(devConfig);
		prod && logger.success('build site success!');
	} catch (error) {
		logger.error(error);
	}
}
