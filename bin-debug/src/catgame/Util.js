/**
 *
 * @author
 *
 */
var Util = (function () {
    function Util() {
    }
    var __egretProto__ = Util.prototype;
    Util.getPointByIndex = function (index) {
        var point = new egret.Point();
        point.y = index % 9;
        point.x = Math.floor(index / 9);
        return point;
        //将第几个点转成几行几列
    };
    Util.getPointXYByIndex = function (index) {
        var point = new egret.Point();
        var space = 0;
        if (Math.floor(index / 9 % 2) == 1) {
            space = 25;
        }
        point.x = 50 + 45 * (index % 9) + space;
        point.y = 370 + 45 * Math.floor(index / 9);
        return point;
        //将第几个点转换成XY坐标
    };
    Util.getIndexByPoint = function (p) {
        var index = p.x * 9 + p.y;
        return index;
        //将几行几列转成第几个点
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
