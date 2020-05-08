const htmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const cssTIQU = require('mini-css-extract-plugin')
const webapckMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')
    // const VueLoaderPlugin = require('vue-loader/lib/plugin');

// console.log(process.env.NODE_ENV, 'jsjsjsj')

const isDev = process.env.NODE_ENV === 'development'
console.log(isDev,'-------')
let config
    // console.log(path.join(__dirname, '../src/main.js'), 'ddddd')

if (isDev) {
    config = webapckMerge(baseConfig, {
            devtool: 'cheap-module-eval-source-map',
            module: {
                rules: [{
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },{
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                }]
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new htmlPlugin({
                    template: path.join(__dirname, '../src/index.html')
                }),
                new webpack.DefinePlugin({
                    'process.env': isDev ? '"development"' : '"production"'
                })
                

            ],
            devServer: {
                port: 8000,
                host: '0.0.0.0', // 同一个局域网的ip都可以访问
                overlay: {
                    errors: true // 错误显示到网页上
                },
                headers: { 'Access-Control-Allow-Origin': '*' },
                // publicPath: '/publick/',
                historyApiFallback: {
                    index: '/index.html' // 这个配置太重要了 如果不加上它，如果设置了output.public，启动服务后无法访问
                },
                proxy: {
                    // '/mock': 'http://127.0.0.1:3333/',
                    // '/user': 'http://127.0.0.1:3333/'
                },
                hot: true,
                open: true
            }
        })
        // console.log(config.plugins)
} else {
    config = webapckMerge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/main.js')
                // vendor: ['vue']
        },
        module: {
            rules: [{
                test: /\.(le|c)ss$/,
                use: [
                    cssTIQU.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'less-loader'
                ]
            }]
        },
        output: {
            filename: 'js/[name]-[chunkhash:5].js',
            // path: path.join(__dirname, '../dist'),
            publicPath: '/dist/'
                // 这是虚拟目录  看不见摸不着
        },
        optimization: {
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            // new VueLoaderPlugin(),
            new cssTIQU({
                filename: 'css/[name].[contentHash:5].css',
                chunkFilename: '[name].[contentHash:5].css'
            }),
            new htmlPlugin({
                template: path.join(__dirname, '../src/index.html')
            })

        ]
    })
}
config.resolve = {
    
    extensions: ['.js', '.json', '.jsx', '.css', '.less']

}

module.exports = config
