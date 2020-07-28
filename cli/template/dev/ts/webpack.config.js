const webpack              = require('webpack');
const path                 = require('path');
const config               = require('./package.json');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const autoprefixer         = require('autoprefixer');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin }    = require('vue-loader');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const AddAssetHtmlPlugin   = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const moment               = require('moment');
{{#Carefree}}const Carefree             = require('@nutui/carefree');{{/Carefree}}
const WebpackUploadPlugin  = require('@nutui/upload/webpackUploadPlugin');
{{#Smock}}const Smock                = require('smock-webpack-plugin');{{/Smock}}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = (env,argv)=> {
    
    let  webpackConfig = {
        entry:{
            app:'./src/app.ts'
        },
        output:{
            path: path.resolve(__dirname, 'build' + '/' + config.version),
            publicPath: config.publicPath + '/'+config.version+'/',
            filename: 'js/[name].js'
        },
        stats: {
            entrypoints: false,
            children: false
        },
        resolve:{
            extensions:['.js','.vue','.json','.ts','.tsx']
        },
        
        module:{
           rules:[
                {
                    test:/\.css$/,
                    use: [
                        argv.mode==='development'?'style-loader': MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.(sa|sc)ss$/,
                    use: [
                        argv.mode==='development'?'style-loader': MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        {
                            loader: 'sass-loader',
                            options: {
                                data: `@import "@nutui/nutui/dist/styles/index.scss"; `,
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use:{
                        loader:'url-loader',
                        options:{
                            name:'img/[name].[ext]',
                            limit:3000
                        }
                    },
                   
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test:/\.vue$/,
                    use:[
                        {
                            loader:'vue-loader',
                            options: {
                                loaders:{
                                    scss:[
                                         argv.mode==='development'?'vue-style-loader': MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            },
                        }
                    ]
                },
                {
                    test:/\.js$/,
                    use:'babel-loader',
                   
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                      "babel-loader",
                      {
                        loader: "ts-loader",
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                      },
                      {
                        loader: 'tslint-loader'
                      }
                    ]
                }
                // {
                //     test: /\.ts$/,
                //     exclude: /node_modules/,
                //     enforce: 'pre',
                //     use: [{
                //         loader: "tslint-loader"
                //     }]
                // },
                // {
                //     test: /\.tsx$/,
                //     exclude: /node_modules/,
                //     use: [{
                //         loader: "ts-loader",
                //         options: { appendTsxSuffixTo: [/\.vue$/] }
                //     }]
                // }
           ]
        },
        plugins:[
            new CleanWebpackPlugin('build'),
            new VueLoaderPlugin(),
            new MinicssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)$/g,
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    autoprefixer: false,
                },
    
            })
        ],
    }
    
    if(argv.mode === 'production'){

        let vendorVersion = config.vendorVersion;
        let vendorTarget ='/lib/vendor.dll.js';
        if(vendorVersion!=''){
            vendorTarget = '/lib/'+vendorVersion+'/vendor.dll.js';
        }
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template:'./src/index.html',
                filename:path.resolve(__dirname,'build/index.html'),
                chunksSortMode:'none'
            }),
            new webpack.DllReferencePlugin({
                context:__dirname,
                manifest:require('./static/vendor-manifest.json')
            }),
            new htmlWebpackIncludeAssetsPlugin({
                assets:[vendorTarget],
                publicPath:config.publicPath,
                append:false
                
            }),
            new CopyWebpackPlugin([
                { from: path.join(__dirname, "./static/vendor.dll.js"), to: path.join(__dirname, "./build"+vendorTarget) }
            ]),
            new webpack.BannerPlugin({
                banner:`${config.name} ${config.version} ${moment().format()}` 
            })
        ]);
        if(env && env.upload){
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new WebpackUploadPlugin({
                    source:'build',
                    ignoreRegexp:/node_moudles/,
                    httpOption:{
                        host:'测试服务器地址',
                        port:3000,
                        username:'',
                        password:'',
                        target:`/var/www/html/${config.ftpServer}/${config.ftpTarget}`
                    }
                })
            ]);
        }
    
    }else{
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template:'./src/index.html',
                chunksSortMode:'none'
            }),
            new webpack.DllReferencePlugin({
                context:__dirname,
                manifest:require('./static/vendordev-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: require.resolve('./static/vendordev.dll.js'),
                includeSourcemap: false
    
            }),
            {{#Smock}}new Smock(config.smock){{/Smock}}
        ]);
        if(env && env.carefree){
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('carefree')
                }),
                new Carefree({
                    justUseWifi: false,
                    publicPath: '//page.jd.com/'+config.ftpTarget+'/'+config.version+'/',
                    ftp: {
                        host: '测试服务器地址',
                        port: 3000,
                        source: 'build',
                        target: '/var/www/html/page.jd.com/'+config.ftpTarget+'/'
                    }
                    
                })
            ]);
            webpackConfig.devtool = false;
            return webpackConfig;
        }
        webpackConfig.output.publicPath = '/';
        webpackConfig.devtool = '#cheap-module-eval-source-map';
        webpackConfig.devServer = {
            contentBase:path.resolve(__dirname,'build'),
            //host:'192.168.191.2',
            //port:8080,
            compress:true,
            historyApiFallback:true
        }
    }
    
    return webpackConfig;
 
}
    


