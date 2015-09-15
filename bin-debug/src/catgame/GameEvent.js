/**
 *
 * @author
 *
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this.open_tile_index = 0;
        this.move_cat_index = 0;
    }
    var __egretProto__ = GameEvent.prototype;
    GameEvent.OPEN_TILE = "open_tile";
    GameEvent.MOVE_CAT = "move_cat";
    GameEvent.RE_MOVE = "re_move";
    GameEvent.RE_PLAY = "re_play";
    GameEvent.START_GAME = "start_game";
    return GameEvent;
})(egret.Event);
GameEvent.prototype.__class__ = "GameEvent";
