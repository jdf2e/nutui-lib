import { compileSite } from "../compiler/site";
import downloadFast from'../lib/downloadfast' ;
import download from '../lib/download' ;
const path = require('path');
const glob = require('glob');
const inquirer = require('inquirer');
const fs = require('fs');

const generator = require('../lib/generator');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const latestVersion = require('latest-version');
let projectName:String ;

export function create(env:Object,options:Array<String>) { 
    projectName = options[0]; 
	go().then((res)=>{   
        console.log('')
        console.log(logSymbols.success,chalk.green('创建成功:)'));
        console.log(logSymbols.info,`cd ${projectName}`);
        console.log(logSymbols.info,`安装npm install`);
        if(res === 'fast'){        
            console.log(logSymbols.info,'开发 npm run dev');
            console.log(logSymbols.info,'编译 npm run build');
            console.log(logSymbols.info,'编译到本地路径 npm run build:local');
            console.log(logSymbols.info,'上传 npm run upload');              
            console.log(logSymbols.info,'代码检查和格式化 npm run lint');
            console.log(logSymbols.info,'图片压缩和webp转换 npm run compress');  
        }else{       
            console.log(logSymbols.info,'先编译第三方依赖库 npm run dll');
            console.log(logSymbols.info,'开发 npm run dev');
            console.log(logSymbols.info,'编译 npm run build');
            console.log(logSymbols.info,'上传 npm run upload');
            console.log(logSymbols.info,'真机调试 npm run carefree');
            console.log(logSymbols.info,'代码检查和格式化 npm run lint');
            console.log(logSymbols.info,'图片压缩和webp转换 npm run compress');       
        }
	}).catch((err)=>{ 
	});
}

async function go(){
    const projectRoot = await  new Promise((resolve,reject)=>{
            const list = glob.sync('*');
            let rootName = path.basename(process.cwd());
            //判断是否存在该目录
            if(projectName === rootName){
                inquirer.prompt({
                    name:'buildInCurrent',
                    message:'在当前目录下创建新项目？',
                    type:'confirm',
                    default:true
                }).then((answer:any)=>{
                    resolve(answer.buildInCurrent ? '.': projectName);
                })
            }else if(list.length){
                if(list.filter((name:any) =>{
                    const fileName = path.resolve(process.cwd(),path.join('.',name));
                    const isDir = fs.statSync(fileName).isDirectory();
                    return  name.indexOf(projectName) != -1 && isDir
                }).length !== 0){
                    console.error(logSymbols.error,chalk.red(`项目${projectName}已经存在`));
                }else{
                     resolve(projectName);
                }
            }else{
                resolve(projectName);
            }
        })
        

    let answer:any= await  new Promise((resolve,reject)=>{
       
        if(projectRoot != '.'){
            fs.mkdirSync(projectRoot);
        }
        return resolve( inquirer.prompt([
            {
                name:'projectName',
                message:'项目名称',
                default:projectName
            },
            {
                name:'projectVersion',
                message:'项目版本号',
                default:'1.0.0'
            },
            {
                name:'projectDescription',
                message:'项目简介',
                default:`A project named ${projectName}`
            },
            {
                name:'uploadHost',
                message:'上传服务器地址',
                default:`测试服务器host地址`
            },
            {
                name:'author',
                message:'作者',
                default:`佚名`
            }            
        ]))     
    })
    let anser2:any = await new Promise((resolve,reject)=>{
        return resolve( inquirer.prompt([
            {
                name:'isneedfast',
                message:`是否选择推荐配置？`,
                type:'rawlist',
                choices:[
                    { name: '推荐配置集成了 vue、vuex、vue-router、axios、TypeScript、NutUI2开发速度更快！', value: '是' },
                    { name: '自定的配置可以选择是否使用vuex、TypeScript、 NutUI2、 Carefree、 Smock', value: '否' }                   
                ]
            }
        ]))
    });
    if(anser2.isneedfast === '是'){        
        let options = Object.assign(answer,{
            target:projectRoot
        })    
        await new Promise((resolve,reject)=>{ 
            resolve(downloadFast(options))
        })    
        return 'fast';
    }    
    let anser3 =  await new Promise((resolve,reject)=>{
        return resolve(inquirer.prompt([{	
            name:'bucket',
            type:'checkbox',
            message:'第三方依赖库(多选)',
            validate:(bucketstr:any)=>{
                return new Promise((resolve,reject)=>{
                    if(bucketstr.indexOf('vue') === -1){
                        reject('vue 必选！');
                    }else{
                        resolve(true);
                    }
                })
            },
            choices:
            [{
                name:'vue',
                checked:true
            },{
                name:'axios',
                checked:true
            },{
                name:'vue-router',
                checked:true
            },{
                name:'qs',
                checked:true
            },{
                name:'vuex',
                checked:false
            }]
        },{
            name:'features',
            type:'checkbox',
            message:'支持的功能选择',
            choices:[
                {
                    name:'NutUI2',
                    checked:true,
                },
                {
                    name:'Carefree',
                    checked:true
                },
                {
                    name:'Skeleton',
                    checked:false,
                },
                {
                    name:'TypeScript',
                    checked:false,
                },{
                    name:'Smock',
                    checked:false,
                }
                // ,{
                //     name:'PWA',
                //     checked:false
                // }
            ]
        }]))
    });
    answer  = Object.assign(answer,anser3)  
    const version = await Promise.all([latestVersion('@nutui/carefree'),
        latestVersion('smock-webpack-plugin'),
        latestVersion('@nutui/nutui'),
        latestVersion('@nutui/babel-plugin-separate-import')
    ])
  
    if(answer.features.indexOf('Carefree')!=-1){
        answer.carefreeVersion = version[0];
    }
    if(answer.features.indexOf('Smock')!=-1){
        answer.smockVersion =version[1];
    }
    answer.nutuiVersion = version[2];
    answer.nutuiSeparateVersion =version[3];
    
    const target = await new Promise((resolve,reject)=> {
        for(let a of answer.bucket){
            answer[a] = true;
        }
        for(let b of answer.features){
            answer[b] = true;
        }
        return resolve(download(projectRoot));
    })
    const context = {
        name:projectName,
        root:projectName,
        downloadTemp:target,
        metadata:{
            ...answer
        }
    }
    let dest = '.';
    if(projectRoot != '.'){
        dest =  path.parse(context.downloadTemp).dir;
    }
    const res = await generator(context.metadata,context.downloadTemp,dest);
     return res;
}