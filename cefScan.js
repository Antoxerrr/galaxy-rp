const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Имя шаблона для создания браузеров,
// его будем пропускать при сканировании
const TEMPLATE_DIR_NAME = 'BrowserTemplate'

/**
 * Сканер для браузеров (интерфейсов).
 * Каждый отдельный интерфейс оформлен в виде Vue приложения,
 * которое будет собираться вебпаком в файлы клиента отдельно от других.
 * Сканер ищет все имеющиеся браузеры и отдаёт необходимые настройки вебпаку.
 */
class BrowserScanner {

    BROWSERS_DIR = path.resolve(__dirname, 'src/cef/browsers')
    EXCLUDE_LIST = [TEMPLATE_DIR_NAME, 'common']
    // Тут будут храниться результаты сканирования - названия папок,
    // в которых лежат наши Vue аппки
    _browsers = []

    constructor() {
        this._scan(this.BROWSERS_DIR);
        this._validateUnique();
    }

    _validateUnique() {
        let names = this._browsers.map(value => value.name)
        let unique = (new Set(names)).size === names.length;
        if (!unique) throw 'Имена браузеров должны быть уникальными!!!'
    }

    /**
     * Пачка HTML плагинов для вебпака.
     * Отдельно для каждого интерфейса.
     */
    getHTMLPlugins() {
        return this._browsers.map(value => {
            return new HtmlWebpackPlugin({
                template: value.HTMLTemplatePath,
                filename: path.join(value.name, `index.html`),
                chunks: [`${value.name}`],
                publicPath: '../'
            })
        });
    }

    /**
     * Входные точки по каждому интерфейсу.
     */
    getEntries() {
        return this._browsers.reduce((o, next) => ({...o, [next.name]: path.resolve(next.path, 'main.js')}), {});
    }

    _addBrowser(dirPath, name, hasHTMLTemplate) {
        let HTMLTemplatePath = hasHTMLTemplate ?
            path.resolve(dirPath, 'index.html') :
            path.resolve(this.BROWSERS_DIR, 'default.index.html')
        this._browsers.push({
            path: dirPath,
            name: name,
            HTMLTemplatePath: HTMLTemplatePath
        });
    }

    _scan(dirPath) {
        let files = fs.readdirSync(dirPath);
        // Директория содержит интерфейс, если в ней находятся три основные файла каждого браузера
        if (files.includes('main.js') && files.includes('App.vue')) {
            this._addBrowser(dirPath, path.basename(dirPath), files.includes('index.html'))
        } else {
            // Рекурсивно идем дальше
            files.forEach(file => {
                // Формируем новый абсолютный путь, и будем пропускать, если это не директория
                let newPath = path.resolve(dirPath, file);
                if (!this.EXCLUDE_LIST.includes(file) && fs.statSync(newPath).isDirectory()) {
                    this._scan(newPath);
                }
            })
        }
    }
}

const scanner = new BrowserScanner();

module.exports = { getBrowserScanner: () => scanner };