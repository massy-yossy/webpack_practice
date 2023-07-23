//パスの指定
const path = require('path')
//プラグインのインポート
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'development', //本番にビルドする→production 開発用→development
    devtool: 'source-map', //そのままコンパイルされる
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, "./dist"), //絶対パスを指定
        filename: './js/main.js', //distのファイル名を変更する
    },
    devServer: { //webpack-dev-serverのLive Reloade機能を使うための設定これを書かないとhot reloadされない
        static: path.resolve(__dirname, 'src')
    },
    module: { //モジュールというオブジェクトの中に
        rules: [ //rulesというオプションの配列がある
            {
                test: /\.(ts|tsx)/, //typescript用のルールを設定
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.js/, //js用のルール
                exclude: /node_modules/, //node_modulesは除外する
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                //0.25%以上シェアされて、サポートを受けているブラウザが読み込めるようにトランスパイルされる
                                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
                                '@babel/preset-react'
                            ],
                        },
                    },
                ],
            },
            { //オブジェクト単位でルールを記載する
                test: /\.(css|sass|scss)/, //.css,sass,scssというファイル名を検知する～ここからCSSのルール～
                use: [
                    {
                        //ローダーは下から読み込まれる, style-loaderの代わりにMiniCssExtractPluginのローダーを使用
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader', //.cssというファイルがあれば、css-loaderを使用するというルール
                        options: {
                            sourceMap: false //ソースマップ作成はtrue・ファイルサイズが重くなるので本番環境ではオフ(false)にする
                        }
                    },
                    {
                        loader: 'sass-loader', //sass用のローダー
                    },
                ],
            },
            {//ここから画像読み込み用のルールを記載
                test: /\.(png|jpg|jpeg)/, //　\.png|\.jpgでも良い
                type: 'asset/resource', //asset用
                generator: { //asset用
                    filename: 'images/[name][ext]', //asset用extの前に.は必要なし
                },
                use: [
                    {
                        loader: "image-webpack-loader", //画像圧縮用のローダー
                        options: { //圧縮のクオリティのオプション
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        },
                    }
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
                use: [ //使用するloaderを記載下から読み込まれる
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
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
        new HtmlWebpackPlugin({ // HTMLを生成するプラグイン
            template: './src/templates/members/taro.pug',// このhtmlにビルドされたファイルが読み込まれる
            filename: 'members/taro.html' //filenameは出力先の名前を指定
        }),
        new CleanWebpackPlugin(), // distフォルダの中の不要なファイルを削除するプラグイン
    ]
}
