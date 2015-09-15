var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.call(this);
        this.IsAction1_mc = true;
        //stay的猫
        var data = RES.getRes("stay_json");
        var texture = RES.getRes("stay_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        this.Action1 = new egret.MovieClip(mcFactory.generateMovieClipData());
        this.Action1.gotoAndPlay(0, -1);
        // console.log("11111");
        //围住的猫
        data = RES.getRes("weizhu_json");
        texture = RES.getRes("weizhu_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        this.Action2 = new egret.MovieClip(mcFactory.generateMovieClipData());
        this.Action2.gotoAndPlay(0, -1);
        //  console.log("22222");
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.PlayAction();
    }
    var __egretProto__ = Cat.prototype;
    __egretProto__.init = function (Index) {
        var p = Util.getPointXYByIndex(Index);
        this.x = p.x;
        this.y = p.y;
        this.IsAction1_mc = true;
        this.PlayAction();
        //  console.log("猫移动了");
    };
    __egretProto__.moveCat = function (Index, IsAction1) {
        this.IsAction1_mc = IsAction1;
        var p = Util.getPointXYByIndex(Index);
        this.x = p.x;
        this.y = p.y;
        this.PlayAction();
    };
    __egretProto__.PlayAction = function () {
        if (this.numChildren) {
            this.removeChildAt(0);
        }
        if (this.IsAction1_mc) {
            this.addChild(this.Action1);
            this.Action1.gotoAndPlay(0, -1);
        }
        else {
            this.addChild(this.Action2);
            this.Action2.gotoAndPlay(0, -1);
        }
    };
    return Cat;
})(egret.Sprite);
Cat.prototype.__class__ = "Cat";
