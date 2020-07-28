const fs = require('fs');
const path = require('path');
export type NodeEnv = 'production' | 'development' | 'test';
export type Version = '2' | 'jdl';
export function setNodeEnv(value: NodeEnv) {
	process.env.NODE_ENV = value;
}
export function setVersion(value: Version) {
	process.env.NUTUI_VERSION = value;
}
export function isDev() {
	return process.env.NODE_ENV === 'development';
}

export function isTest() {
	return process.env.NODE_ENV === 'test';
}

export function removeDir(url:String) {
	if (fs.existsSync(url)) {
		
		// 读取要删除的目录，获取目录下的文件信息
		let files = fs.readdirSync(url);
		
		// 循环遍历要删除的文件
		files.forEach((file:any) => { 
		  // 将文件的名字和要删除的目录路径组合，得到要删除的文件的路径
		  let filePath = path.join(url, file); 
		  //   如果是目录，继续遍历(递归遍历)
		  if (fs.statSync(filePath).isDirectory()) { 
			removeDir(filePath);
		  } else {
			// 如果是文件，直接删除文件
			fs.unlinkSync(filePath);
		  }
		});
		fs.rmdirSync(url); //删除所有的空目录
	  }
}
