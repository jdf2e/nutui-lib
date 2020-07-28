// const download  = require('download-git-repo');
// const ora       = require('ora');
// const path     = require('path');
// // 选择下载源
// export default function(target:String,isfast:String){
//     target = path.join(target || '.','.download-temp')
//     return new Promise (function(resolve,reject){
//         let url = ''
//         if(isfast){
//             url = 'direct:https://github.com/jdf2e/nutui-lib.git#dev'
//         }else{
//             url = 'direct:https://github.com/jdf2e/Gaea4.git#dev'
//         }
//         const spinner = ora('正在下载模版')
//         spinner.start()
//         let downloadTarget = path.resolve(process.cwd(),path.join('.',target))
//         console.log(123123,url);
//         download(url,downloadTarget,{clone:true},(err:any)=>{
//             console.log('失败')
//             if(err){
//                 spinner.fail()
//                 reject(err)
//             }else{
//                 spinner.succeed()
//                 resolve(target)
//             }
//         })
//     })
// }
export default function(){
    console.log('开始生产')
}
