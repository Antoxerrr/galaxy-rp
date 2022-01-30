/* Простой бинд интерфейса на кнопку. */
export const bindBrowser = (key, browserObj, ...args) => {
    mp.keys.bind(key, true, () => { browserObj.bindPressed(...args); });
};
