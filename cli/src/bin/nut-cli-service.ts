#!/usr/bin/env node
import program from 'commander';
import { serve } from '../commands/serve';
import { build } from '../commands/nut-build';
program.command('serve').description('运行项目').action(serve);
program.command('build').description('编译项目').action(build);
program.parse(process.argv);
