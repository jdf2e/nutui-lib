#!/usr/bin/env node
import program from 'commander';
import { serve } from '../commands/serve';
program.command('serve').description('运行项目').action(serve);
program.parse(process.argv);
