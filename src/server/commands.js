mp.events.addCommand('gcords', player => {
    player.outputChatBox(`x: ${player.position.x.toFixed(4)}`);
    player.outputChatBox(`y: ${player.position.y.toFixed(4)}`);
    player.outputChatBox(`z: ${player.position.z.toFixed(4)}`);
});

mp.events.addCommand('veh', (player, _, vehName) => {
    let defaultVehicle = 'cognoscenti';
    if (!vehName) {
        vehName = defaultVehicle;
    }
    let pos = player.position;
    pos.x += 2;
    // If player has vehicle - change model.
    if (player.vehicle) {
        player.vehicle.repair();
        player.vehicle.position = pos;
        player.vehicle.model = mp.joaat(vehName);
    // Else - create new vehicle.
    } else {
        player.vehicle = mp.vehicles.new(mp.joaat(vehName), pos);
    }
});
