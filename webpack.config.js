const path = require('path')

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
                        loader: 'style-loader', //ローダーは下から読み込まれる
                    },
                    {
                        loader: 'css-loader', //.cssというファイルがあれば、css-loaderを使用するというルール
                    },
                ],
            },
        ],
    },
}
