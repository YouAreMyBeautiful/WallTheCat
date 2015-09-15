/**
 *
 * @author 
 *
 */
class RePlay extends egret.Sprite{
    private replay: egret.Bitmap;
	public constructor() {
        super();
        this.replay = new egret.Bitmap();
        this.replay.texture = RES.getRes("replay_png");
        this.x = 120;
        this.y = 370;
        this.touchEnabled = true;
        this.addChild(this.replay);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
        //console.log("点击重新开始面板");
	}
    private onclick(evt:GameEvent) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
        var evt: GameEvent = new GameEvent(GameEvent.RE_MOVE);
        this.dispatchEvent(evt);
        this.removeChild(this.replay);
        console.log("Replay抛出重新开始事件");
    }
}
