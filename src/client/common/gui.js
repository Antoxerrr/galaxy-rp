export const setInteractState = state => {
    mp.game.ui.displayRadar(!state);
    mp.gui.chat.show(!state);
    mp.gui.chat.activate(!state);
    mp.nametags.enabled = !state;
    mp.gui.cursor.show(state, state);
};
