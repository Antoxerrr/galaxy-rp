/*Отключение некоторых элементов внутриигрового худа.*/
mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(3);
    mp.game.ui.hideHudComponentThisFrame(4);
    mp.game.ui.hideHudComponentThisFrame(13);
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(7);
    mp.game.ui.hideHudComponentThisFrame(6);
});
