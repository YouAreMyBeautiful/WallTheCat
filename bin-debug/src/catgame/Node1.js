var Node1 = (function (_super) {
    __extends(Node1, _super);
    function Node1() {
        _super.call(this);
        this.index = 0;
        this.isOpen = true;
        //this.map_array = map_array;
        //this.cat = cat;
        this.redSkin = new egret.Bitmap();
        this.redSkin.texture = RES.getRes("pot2_png");
        this.blackSkin = new egret.Bitmap();
        this.blackSkin.texture = RES.getRes("pot1_png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.touchEnabled = true;
        this.addChild(this.blackSkin);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    }
    var __egretProto__ = Node1.prototype;
    __egretProto__.close = function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.removeChild(this.blackSkin);
            this.addChild(this.redSkin);
        }
    };
    __egretProto__.onclick = function () {
        if (this.isOpen) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
            this.close();
            var evt = new GameEvent(GameEvent.MOVE_CAT);
            evt.move_cat_index = this.index;
            this.dispatchEvent(evt);
        }
    };
    return Node1;
})(egret.Sprite);
Node1.prototype.__class__ = "Node1";
