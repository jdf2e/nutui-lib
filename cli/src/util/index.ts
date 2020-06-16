export type NodeEnv = 'production' | 'development' | 'test';
export type Version = '2' | '3';
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
