const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const {getBrowserScanner} = require("./cefScan");

const SERVER_DIR_PATH = path.resolve(__dirname, '../');
const OUTPUT_DIR = path.resolve(SERVER_DIR_PATH, 'client_packages/galaxy/web')

// Сканер браузеров
const browserScanner = getBrowserScanner();

module.exports = {
    entry: {
        ...browserScanner.getEntries()
    },
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    output: {
        filename: `[name]/index.js`,
        path: OUTPUT_DIR,
        publicPath: ''
    },
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.s[ca]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        ...browserScanner.getHTMLPlugins(),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}