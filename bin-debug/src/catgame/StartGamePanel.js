/**
 *
 * @author
 *
 */
var StartGamePanel = (function (_super) {
    __extends(StartGamePanel, _super);
    function StartGamePanel() {
        _super.call(this);
        this.startGameBitmap = new egret.Bitmap();
        this.startGameBitmap.texture = RES.getRes("btn_start_png");
        this.width = 400;
        this.height = 588;
        this.touchEnabled = true;
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;
        this.addChild(this.startGameBitmap);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.remove, this);
    }
    var __egretProto__ = StartGamePanel.prototype;
    __egretProto__.remove = function () {
        this.removeChild(this.startGameBitmap);
        var evt = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
        console.log("抛出初始化猫的事件");
    };
    return StartGamePanel;
})(egret.Sprite);
StartGamePanel.prototype.__class__ = "StartGamePanel";
