import { ROOT_PACKAGE_PATH } from "../util/dic";
const conf = require(ROOT_PACKAGE_PATH('src/config.json'));
const fs = require('fs');
export default async function generateIndexScss() {
	let content = `$assetsPath:'./assets/';`;
	content += `\n@import './styles/index.scss';`
	conf.packages.map((item: { name: string }) => {
		const cptName = item.name.toLowerCase();
		content += `\n@import './packages/${cptName}/${cptName}.scss';`;
	});
	const filePath = ROOT_PACKAGE_PATH('dist/nutui.scss');
	fs.writeFile(filePath, content, (err: any) => {
		if (err) throw err;
	});
}
