import {Browsers} from "../cef/registry";
import {setInteractState} from "./common/gui";

mp.events.add('authScreen', () => {
    Browsers.Auth.getOrCreate();
    setInteractState(true);
});
mp.events.add('authSuccess', () => {
    Browsers.Auth.destroy();
    setInteractState(false);
});
/* Получение данных от браузера и отправка на сервер .*/
mp.events.add('loginData', (username, password) => {
    mp.events.callRemote('loginDataFromClient', username, password);
});

/* Обработка сообщения от сервера о неверно введенных данных авторизации. */
mp.events.add('wrongAuthCredentials', () => {
    Browsers.Auth.execute('this.wrongCredentials()');
});
