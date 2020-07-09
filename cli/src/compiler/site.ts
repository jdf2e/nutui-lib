import { devConfig } from '../webpack/dev.config';
import { prodConfig } from '../webpack/prod.config';
import { prodConfig as prodConfigJDL } from '../webpack/prod.config.jdl';
import { compileWebPack } from './webpack';
import logger from '../util/logger';
export async function compileSite(prod: boolean = false) {
	try {
		prod ? await compileWebPack(process.env.NUTUI_VERSION === "2" ? prodConfig : prodConfigJDL) : compileWebPack(devConfig);
		prod && logger.success('build site success!');
	} catch (error) {
		logger.error(error);
	}
}
