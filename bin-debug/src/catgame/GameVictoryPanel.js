/**
 *
 * @author
 *
 */
var GameVictoryPanel = (function (_super) {
    __extends(GameVictoryPanel, _super);
    function GameVictoryPanel(total) {
        _super.call(this);
        this.gameVictoryBitmap = new egret.Bitmap();
        this.mao2 = new egret.Bitmap();
        this.share = new egret.Bitmap();
        this.total = 0;
        this.arr1 = ["绝世神经高人", "神精病博士", "神经大神", "你是我的小苹果", "院长派来的救兵", "精神病院长", "扫地僧", "传说中的高手", "风骚的少年", "你家里人知道吗", "隔壁老王"];
        this.arr2 = ["就是这么任性", "不作死就不会死", "根本停不下来", "且行且珍惜", "我是猴子请来的", "然而并没有什么卵用", "也是蛮拼的", "只想安静地做个美男子", "你是汪星人吗"];
        this.replay = new RePlay();
        this.total = total;
        var replay;
        replay = new RePlay();
        this.gameVictoryBitmap.texture = RES.getRes("victory_png");
        this.mao2.texture = RES.getRes("mao2_png");
        //this.share.texture = RES.getRes("shareBTN_png");
        this.width = 400;
        this.height = 500;
        this.touchEnabled = true;
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2 - 25;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;
        this.mao2.x = 90;
        this.mao2.y = 265;
        this.text1 = new egret.TextField;
        var msg = new String(this.total);
        this.text1.text = "你用了" + msg + "步抓住了神!经!猫！\n";
        //this.text1.textAlign = egret.HorizontalAlign.CENTER;
        this.text1.x = 30;
        this.text1.y = 150;
        this.text1.textColor = 0XFF0000;
        this.text2 = new egret.TextField;
        this.text2.text = "神经全国排名" + Math.floor(this.total * 1234 + Math.random() * this.total * 500) + "位";
        this.text2.x = 30;
        this.text2.y = 180;
        this.text2.size = 23;
        this.text2.textColor = 0xff0000;
        this.text3 = new egret.TextField;
        this.text3.text = "击败了精神病院" + (100 - Math.floor(this.total * Math.random())) + "%的精神病患者";
        this.text3.x = 30;
        this.text3.y = 210;
        this.text3.size = 23;
        this.text3.textColor = 0xff0000;
        this.text4 = new egret.TextField;
        var title;
        if (this.total < 10) {
            title = "独孤求败";
        }
        else if (this.total < 20) {
            var v = this.total % 10;
            title = this.arr1[v];
        }
        else {
            title = this.arr2[Math.floor(Math.random() * this.arr2.length)];
        }
        this.text4.text = "获得称号：" + title;
        this.text4.x = 30;
        this.text4.y = 240;
        this.text4.size = 23;
        this.text4.textColor = 0xff0000;
        this.addChild(this.gameVictoryBitmap);
        this.addChild(this.mao2);
        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
        this.addChild(this.text4);
        //var replay: RePlay;
        // replay = new RePlay();
        this.addChild(this.replay);
        this.addChild(this.share);
        this.replay.addEventListener(GameEvent.RE_MOVE, this.remove, this);
    }
    var __egretProto__ = GameVictoryPanel.prototype;
    __egretProto__.remove = function () {
        this.replay.removeEventListener(GameEvent.RE_MOVE, this.remove, this);
        this.removeChild(this.gameVictoryBitmap);
        this.removeChild(this.mao2);
        this.removeChild(this.text1);
        this.removeChild(this.text2);
        this.removeChild(this.text3);
        this.removeChild(this.text4);
        this.removeChild(this.share);
        var evt = new GameEvent(GameEvent.RE_PLAY);
        this.dispatchEvent(evt);
    };
    return GameVictoryPanel;
})(egret.Sprite);
GameVictoryPanel.prototype.__class__ = "GameVictoryPanel";
