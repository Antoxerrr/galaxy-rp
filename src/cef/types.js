import {Browsers} from "./registry";
import {build_path} from "../client/common/path";
import {RAGE_RELATIVE_PATH} from "./const";

/* Базовый класс любого браузера. */
class BaseBrowser {
    _name;
    _rageRelativePath;
    _cursorRequired;
    _cefBrowser;

    constructor(name, cursor) {
        this._name = name;
        this._rageRelativePath = build_path(RAGE_RELATIVE_PATH, name, 'index.html');
        this._cursorRequired = cursor;
    }

    destroy() { this._cefBrowser.destroy() }
    isActive() { return this._cefBrowser && this._cefBrowser.active }
    withCursor() { return this._cursorRequired }
    bindPressed(...args) {}
    execute(code) {
        if (this._cefBrowser && this._cefBrowser.active) {
            this._cefBrowser.execute(code);
        }
    }

    _getBrowser() { return mp.browsers.new(`package://${this._rageRelativePath}`) }
}

/* Дефолтный браузер, работающий по принципу "Включить/Выключить". */
export class DefaultBrowser extends BaseBrowser {

    getOrCreate() {
        if (this._cefBrowser && this._cefBrowser.active) {
            return this._cefBrowser;
        }
        this._cefBrowser = this._getBrowser();
        this._handleCursorDisplay();
        return this._cefBrowser;
    }

    toggle() {
        if (!this._cefBrowser) {
            this._cefBrowser = this.getOrCreate();
            this._handleCursorDisplay();
        } else {
            this._cefBrowser.destroy();
            this._cefBrowser = undefined;
            this._handleCursorDisplay();
        }
    }

    _handleCursorDisplay() {
        let activeBrowsersWithCursor = Object.values(Browsers)
            .filter(browser => browser.isActive() && browser.withCursor());
        let needCursor = activeBrowsersWithCursor.length > 0;
        mp.gui.cursor.show(needCursor, needCursor);
    }

    bindPressed(...args) { this.toggle(); }
}

/* Браузер для алертов. */
export class PopUpBrowser extends BaseBrowser {
    popUp(ms) {
        let browser = this._getBrowser();
        setTimeout(() => { browser.destroy() }, ms);
    }

    bindPressed(...args) { this.popUp(...args); }
}
