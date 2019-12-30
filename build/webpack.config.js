const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
module.exports = {
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {
        // filename: 'output.js',      // 打包后的文件名称
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html') // 打包生成的js文件已经被自动引入html文件中
        }),
        new CleanWebpackPlugin(), // 在打包输出前清空文件夹
        new vueLoaderPlugin(), // vue-loader 用于解析.vue文件
        new Webpack.HotModuleReplacementPlugin() // 配置webpack-dev-server进行热更新
    ],
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'] // 从右向左解析原则
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        alias:{ // 定义相对路径
            'vue$':'vue/dist/vue.esm.js',
            ' @':path.resolve(__dirname,'../src')
        },
        extensions:['*','.js','.json','.vue'] // 这些文件不需要写后缀了
    }
};
