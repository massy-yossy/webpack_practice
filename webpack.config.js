//パスの指定
const path = require('path')
//cssのプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"), //絶対パスを指定
        filename: 'main.js', //distのファイル名を変更する
    },
    module: { //モジュールというオブジェクトの中に
        rules: [ //rulesというオプションの配列がある
            {
                test: /\.css/, //.cssというファイル名を検知する
                use: [
                    {
                        //ローダーは下から読み込まれる, style-loaderの代わりにMiniCssExtractPluginのローダーを使用
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader', //.cssというファイルがあれば、css-loaderを使用するというルール
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',// このhtmlにビルドされたファイルが読み込まれる
        })
    ]
}
