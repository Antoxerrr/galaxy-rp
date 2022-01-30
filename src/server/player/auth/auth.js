const coordinates = require('../../nosql/coordinates.json');
const {skinList} = require("../../common/skinList");

const spawnPlayer = player => {
    player.spawn(new mp.Vector3(
        coordinates.playerDefaultSpawn.x,
        coordinates.playerDefaultSpawn.y,
        coordinates.playerDefaultSpawn.z
    ));
    player.health = 100;
    player.armour = 100;
    // Выдаем рандомный скин
    player.model = mp.joaat(skinList[Math.floor(Math.random() * skinList.length)]);
};

/* Получение данных авторизации от клиента. */
mp.events.add('loginDataFromClient', (player, login, password) => {
    if (login === 'admin' && password === 'admin') {
        spawnPlayer(player);
        player.call('authSuccess');
    } else {
        player.call('wrongAuthCredentials');
    }
});

mp.events.add('playerReady', (player) => {
    player.call('authScreen');
});
