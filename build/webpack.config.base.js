const path = require('path')


// console.log(process.env.NODE_ENV, 'jsjsjsj')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    // mode: 'development',
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        // publicPath: '../dist'

    },
    resolve: {
        // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
        extensions: ['.js', '.json', '.jsx', '.css', '.less']
            // 指定vue运行的版本，提供的有很多版本，有些差别
            // alias: {
            //     vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
            // }

    },
    module: {
        rules: [
            
            {
                test: /\.jsx$/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'images/[name].[hash:5].[ext]'
                    }
                }]
            }
        ]
    }

}

module.exports = config
