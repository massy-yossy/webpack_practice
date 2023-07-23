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
            { //オブジェクト単位でルールを記載する
                test: /\.css/, //.cssというファイル名を検知する～ここからCSSのルール～
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
            {//ここから画像読み込み用のルールを記載
                test: /\.(png|jpg)/, //　\.png|\.jpgでも良い
                type: 'asset/resource', //asset用
                generator: { //asset用
                    filename: 'images/[name][ext]', //asset用extの前に.は必要なし
                },
                use: [
                    // { webpack5からは必要なし
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]', //ファイル名を指定extはエクステンションの略
                    //     }
                    // },
                ],
            },
            { //ここからpug用の設定
                test: /\.pug/,
                use:[ //使用するloaderを記載下から読み込まれる
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options:{
                            pretty: true, //人間の目に見えやすくビルドするため
                        }
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
            template: './src/templates/index.pug',// ここに指定したファイルが読み込まれる
            filename: 'index.html', //filenameは出力先の名前を指定
        }),
        new HtmlWebpackPlugin({ // HTMLを生成するプラグイン
            template: './src/templates/access.pug',// このhtmlにビルドされたファイルが読み込まれる
            filename: 'access.html' //filenameは出力先の名前を指定
        }),
        new CleanWebpackPlugin(), // distフォルダの中の不要なファイルを削除するプラグイン
    ]
}
