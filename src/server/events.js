const coordinates = require('./coordinates.json');

import skinList from './skinList';

mp.events.add('playerJoin', (player) => {
    player.spawn(new mp.Vector3(
        coordinates.playerDefaultSpawn.x,
        coordinates.playerDefaultSpawn.y,
        coordinates.playerDefaultSpawn.z
    ));
    player.health = 100;
    player.armour = 100;

    player.model = mp.joaat(skinList[Math.floor(Math.random()*skinList.length)]);
});
