let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        //path корректно конкатинирует абсолютный путь
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        //в браузере будет dist/main.js
        publicPath: 'dist/'
    },
    devServer: {
        //ошибка в коде отображается на черном фоне поверх всего
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
                // в таком случае все стили вставятся в тег style
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    devtool: process.argv.indexOf('production') !== -1 ? 'source-map' : 'eval-source-map'
};