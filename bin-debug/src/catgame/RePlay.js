/**
 *
 * @author
 *
 */
var RePlay = (function (_super) {
    __extends(RePlay, _super);
    function RePlay() {
        _super.call(this);
        this.replay = new egret.Bitmap();
        this.replay.texture = RES.getRes("replay_png");
        this.x = 120;
        this.y = 370;
        this.touchEnabled = true;
        this.addChild(this.replay);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        //console.log("点击重新开始面板");
    }
    var __egretProto__ = RePlay.prototype;
    __egretProto__.onclick = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        var evt = new GameEvent(GameEvent.RE_MOVE);
        this.dispatchEvent(evt);
        this.removeChild(this.replay);
        console.log("Replay抛出重新开始事件");
    };
    return RePlay;
})(egret.Sprite);
RePlay.prototype.__class__ = "RePlay";
