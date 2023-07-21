//パスの指定
const path = require('path')
//プラグインのインポート
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, "./dist"), //絶対パスを指定
        filename: './js/main.js', //distのファイル名を変更する
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
        new MiniCssExtractPlugin({//cssを別ファイルにするプラグイン
            filename: "./css/main.css", //build時のファイル名の指定
        }),
        new HtmlWebpackPlugin({ // HTMLを生成するプラグイン
            template: './src/templates/index.html',// このhtmlにビルドされたファイルが読み込まれる
        }),
        new CleanWebpackPlugin(), // distフォルダの中の不要なファイルを削除するプラグイン
    ]
}
