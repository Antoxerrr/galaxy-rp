const coordinates = require('./coordinates.json');


mp.events.add('playerJoin', (player) => {
    player.spawn(new mp.Vector3(
        coordinates.playerDefaultSpawn.x,
        coordinates.playerDefaultSpawn.y,
        coordinates.playerDefaultSpawn.z
    ));
    player.health = 100;
    player.armour = 100;
});
