let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');

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
        host: 'localhost',
        port: 3000,
        hot: true,
        open: true,
        //ошибка в коде отображается на черном фоне поверх всего
        overlay: true,
        //для одностранчных приложений со всои роутингом
        historyApiFallback: true,
        //задает папку из которой брать статику (по умолчанию из текущей)
        //contentBase: path.resolve(__dirname, './dist'),
        //все пути, которые не найдены у нас направлялись на порт 3001
        // proxy: {
        //     "*": {
        //         target: "http://localhost:3001",
        //         secure: false
        //     }
        // }
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: process.argv.indexOf('production') !== -1 ? 'source-map' : 'eval-source-map'
};