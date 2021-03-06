import { emptyDir } from 'fs-extra';
import { compilePackage } from '../compiler/package';
import { DIST_DIR } from '../util/dic';
import logger from '../util/logger';
import { compilePackageDisperse } from '../compiler/package.disperse';
import generateIndexScss from '../script/generateIndexScss';
export async function build() {
	try {
		await emptyDir(DIST_DIR);
		await generateIndexScss();
		logger.success('generate nutui.scss success!');
		await compilePackage(false);
		logger.success(`build compilePackage false package success!`);
		await compilePackage(true);
		logger.success(`build compilePackage true package success!`);
		await compilePackageDisperse();
		logger.success(`build compilePackageDisperse package success!`);
		process.exit();
	} catch (error) {
		logger.error(error);
	}
}
