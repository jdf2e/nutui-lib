import fs = require("fs-extra");
const ejs = require("ejs");
import path = require("path");
import globby = require("globby");
const { isBinaryFileSync } = require("isbinaryfile");
  
module.exports = class generator   {
  private files: {[k:string]:any };
  private name: any;
  constructor(param: any) {
    this.files = [];
    this.name = param.name;
  }

  async render() {
    const source = path.resolve(process.cwd(), "template");
    const _files = await globby(["**/*"], { cwd: source });
    return new Promise((resolve, reject) => {
      for (const rawPath of _files) {
        const targetPath = rawPath
          .split("/")
          .map((filename: String) => {
            // dotfiles are ignored when published to npm, therefore in templates
            // we need to use underscore instead (e.g. "_gitignore")
            if (filename.charAt(0) === "_" && filename.charAt(1) !== "_") {
              return `.${filename.slice(1)}`;
            }
            if (filename.charAt(0) === "_" && filename.charAt(1) === "_") {
              return `${filename.slice(1)}`;
            }
            return filename;
          })
          .join("/");
        const sourcePath = path.resolve(source, rawPath);
        const content = renderFile(sourcePath, targetPath);
        if (Buffer.isBuffer(content) || content.trim()) {
          this.files[targetPath] = content;
        }
      }
      const cwd = process.cwd();
      const targetDir = path.resolve(cwd, this.name || ".");
      let packagejson = pkg();
      packagejson.name = this.name;
      this.files["package.json"] = JSON.stringify(packagejson, null, 2) + "\n";
      writeFileTree(targetDir, this.files);
      resolve()
    });
  }
}

function pkg() {
  return {
    name: "",
    version: "0.1.0",
    private: true,
    scripts: {
      serve: "nut-cli-service serve",
      build: "nut-cli-service build", 
    },
    dependencies: {
      "core-js": "^3.6.5",
      vue: "^2.6.11",
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "~4.4.0",
      "@vue/cli-plugin-eslint": "~4.4.0",
      "@vue/cli-service": "~4.4.0",
      "babel-eslint": "^10.1.0",
      eslint: "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "vue-template-compiler": "^2.6.11",
    }, 
    eslintConfig: {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
      ],
      "parserOptions": {
        "parser": "babel-eslint"
      },
      "rules": {}
    },
    browserslist: [
      "> 1%",
      "last 2 versions",
      "not dead"
    ]
  };
}

function renderFile(url: String, targetPath: String) {
  if (isBinaryFileSync(url)) {
    return fs.readFileSync(url);
  }
  const tem = fs.readFileSync(url, "utf-8");
  if (targetPath == "public/index.html") {
    return ejs.render(tem, { title: "nut-cli" });
  }
  return tem;
}

async function writeFileTree(dir:string, files:{[k:string]:any }) {
  Object.keys(files).forEach((name:string) => {
    const filePath = path.join(dir, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
}
