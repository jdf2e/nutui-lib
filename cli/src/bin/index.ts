#!/usr/bin/env node
import { ROOT_CLI_PATH, ROOT_PACKAGE_PATH } from '../util/dic';
const config = require(ROOT_PACKAGE_PATH('package.json'));
const semver = require('semver')
import { setNodeEnv, setVersion } from '../util';
process.argv[2] === 'dev' ? setNodeEnv('development') : setNodeEnv('production');
semver.satisfies(semver.valid(semver.coerce(config.version)), '<2.5.0') ? setVersion('2') : setVersion('2.5.x');
import program from 'commander';
import { dev } from '../commands/dev';
import { build } from '../commands/build';
import { buildSite } from '../commands/build-site';
import { clean } from '../commands/clean';
import { createComponent } from '../commands/createComponent';
import { commitLint } from '../commands/commitLint';
import { test } from '../commands/test';
import { release } from '../commands/npmPublish';
const config_cli = require(ROOT_CLI_PATH('package.json'));

program.version(`@nutui/cli ${config_cli.version}`, '-v', '--version');

program.command('dev').description('本地调试运行官网和Demo示例').action(dev);

program.command('build').description('构建完整版nutui和各个组件可发布到npm的静态资源包').action(build);

program.command('build-site').description('构建官网和Demo示例，进行官网发布').action(buildSite);

program.command('clean').description('清空打包目录').action(clean);

program.command('add').description('新增组件使用该命令').action(createComponent);

program.command('commit-lint').description('获取校验commit message 的配置文件').action(commitLint);

program.command('test').description('运行单元测试').action(test);

program.command('release').description('发布版本...待开发').action(release);

program.parse(process.argv);
