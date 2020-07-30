import path = require("path");
import glob = require("glob");
import inquirer = require("inquirer");
import fs = require("fs-extra");
const generator = require("../compiler/generator");
import logSymbols = require("log-symbols");
const latestVersion = require("latest-version");
let projectName: String;

export function create(env: Object, options: Array<String>) {
  projectName = options[0];
  go().then((res) => {
    console.log()
    console.log(logSymbols.info, `cd ${projectName}`);
    console.log(logSymbols.info, "npm run serve");
  });
}
async function go() {
  const projectRoot = await new Promise((resolve, reject) => {
    const list = glob.sync("*");
    let rootName = path.basename(process.cwd());
    //判断是否存在该目录
    if (projectName === rootName) {
      inquirer
        .prompt({
          name: "buildInCurrent",
          message: "在当前目录下创建新项目？",
          type: "confirm",
          default: true,
        })
        .then((answer: any) => {
          resolve(answer.buildInCurrent ? "." : projectName);
        });
    } else if (list.length) {
      if (
        list.filter((name: any) => {
          const fileName = path.resolve(process.cwd(), path.join(".", name));
          const isDir = fs.statSync(fileName).isDirectory();
          return name.indexOf(projectName) != -1 && isDir;
        }).length !== 0
      ) {
        const cwd = process.cwd();
        const targetDir = path.resolve(cwd, String(projectName) || ".");
        inquirer
          .prompt([
            {
              name: "action",
              type: "list",
              message: `Target directory already exists. Pick an action:`,
              choices: [
                { name: "Overwrite", value: "overwrite" }, 
                { name: "Cancel", value: false },
              ],
            },
          ])
          .then((res: any) => {
            if (!res.action) {
              return;
            } else if (res.action === "overwrite") { 
              fs.remove(targetDir).then(() => { 
                resolve(projectName);
              });
            }
          });
      } else {
        resolve(projectName);
      }
    } else {
      resolve(projectName);
    }
  });

  let answer: any = await new Promise((resolve, reject) => {
    if (projectRoot != ".") {
      fs.mkdirSync(projectRoot);
    }
    return resolve(
      inquirer.prompt([
        {
          name: "projectName",
          message: "项目名称",
          default: projectName,
        },
        {
          name: "projectVersion",
          message: "项目版本号",
          default: "1.0.0",
        },
        {
          name: "projectDescription",
          message: "项目简介",
          default: `A project named ${projectName}`,
        },
        {
          name: "uploadHost",
          message: "上传服务器地址",
          default: `测试服务器host地址`,
        },
        {
          name: "author",
          message: "作者",
          default: `佚名`,
        },
      ])
    );
  });

  let anser2: any = await new Promise((resolve, reject) => {
    return resolve(
      inquirer.prompt([
        {
          name: "isneedfast",
          message: `是否选择推荐配置？`,
          type: "rawlist",
          choices: [
            {
              name:
                "推荐配置集成了 vue、vuex、vue-router、axios、TypeScript、NutUI2开发速度更快！",
              value: "是",
            },
            {
              name:
                "自定的配置可以选择是否使用vuex、TypeScript、 NutUI2、 Carefree、 Smock",
              value: "否",
            },
          ],
        },
      ])
    );
  });
  if (anser2.isneedfast === "是") {
    let options = Object.assign(answer, {
      target: projectRoot,
    });
    await new generator({ name: projectName }).render();

    console.log(`📦  Installing additional dependencies...`);
    return new Promise((resolve, reject) => {
      const { spawn } = require("child_process");
      const cwd = process.cwd();
      const targetDir = path.resolve(cwd, String(projectName) || ".");
      const ls = spawn("npm", ["i"], { cwd: targetDir, stdio: "inherit" });
      ls.on("close", (code: any) => {
        resolve();
      });
    });
  }
}
