#!/usr/bin/env node
import program from 'commander';
import { create } from '../commands/create';
program.command('create').description('创建新项目').action(create);
program.parse(process.argv);
