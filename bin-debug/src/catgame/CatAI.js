/**
 *
 * @author
 *
 */
var CatAI = (function () {
    function CatAI(map_array) {
        this.map_array = map_array;
        this.map = new Array(81);
    }
    var __egretProto__ = CatAI.prototype;
    __egretProto__.findNextIndex = function (from) {
        var i;
        var path = this.findRound(from); //起点周围可行点
        var que = new Array();
        for (i = 0; i < 81; i++) {
            this.map[i] = new Array(2); //申请一个二维数组
            this.map[i][0] = 1000; //到起点最短的距离,初始距离最大
            this.map[i][1] = -1; //表示最短路径上一个节点的位置
        }
        this.map[from][0] = 1;
        var visit = new Array(81); //标记数组
        for (i = 0; i < visit.length; i++)
            visit[i] = 0;
        visit[from] = 1;
        for (i = 0; i < path.length; i++) {
            que.unshift(path[i]);
            this.map[path[i]][0] = 1;
            this.map[path[i]][1] = from;
        }
        while (que.length) {
            var n = que.pop();
            if (this.isExit(n)) {
                var nextIndex = this.findLastIndex(n, from);
                return nextIndex;
            }
            visit[n] = 1; //已经访问过，标记
            var arr1 = this.findRound(n);
            var arr = new Array();
            var arr_len = 0;
            for (i = 0; i < arr1.length; i++)
                if (!visit[arr1[i]])
                    arr[arr_len++] = arr1[i];
            for (i = 0; i < arr.length; i++) {
                var p = arr[i];
                var stpe = this.map[n][0] + 1;
                if (!visit[p] && stpe < this.map[p][0]) {
                    que.unshift(p);
                    this.map[p][0] = stpe;
                    this.map[p][1] = n;
                    visit[p] = 1;
                }
            }
        }
        return 0; //没有找到出路被围住
    };
    __egretProto__.findLastIndex = function (outIndex, from) {
        var lastIndex = this.map[outIndex][1];
        if (lastIndex != from)
            return this.findLastIndex(lastIndex, from);
        else
            return outIndex;
    };
    __egretProto__.isExit = function (index) {
        var p = Util.getPointByIndex(index);
        if (p.y == 0 || p.y == 8 || p.x == 0 || p.x == 8)
            return true;
        else
            return false;
    };
    __egretProto__.getCatRound = function (catIndex) {
        var round = this.findRound(catIndex);
        if (round.length)
            return round[0];
        else
            return 0;
    };
    __egretProto__.findRound = function (_from) {
        var arr = [];
        var p = Util.getPointByIndex(_from);
        var row = p.x; //行
        var col = p.y; //列
        var left = col - 1; //左边点
        if (left >= 0 && this.map_array[Util.getIndexByPoint(new egret.Point(row, left))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(row, left)));
        }
        var right = col + 1; //右边点
        if (right <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(row, right))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(row, right)));
        }
        var top1 = row - 1; //上方第一个点
        if (top1 >= 0 && this.map_array[Util.getIndexByPoint(new egret.Point(top1, col))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(top1, col)));
        }
        var buttom1 = row + 1; //右下第一个点
        if (buttom1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1, col))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(buttom1, col)));
        }
        if (row % 2) {
            var top2 = row - 1; //上方第二个点
            if (top2 >= 0 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(top1, col + 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(top1, col + 1)));
            }
            var buttom2 = row + 1; //右下第二个点
            if (buttom2 <= 8 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1, col + 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(buttom1, col + 1)));
            }
        }
        else {
            var top2 = row - 1; //上方第二个点
            if (top2 >= 0 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(top1, col - 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(top1, col - 1)));
            }
            var buttom2 = row + 1; //右下第二个点
            if (buttom2 <= 8 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1, col - 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(buttom1, col - 1)));
            }
        }
        return arr;
    };
    return CatAI;
})();
CatAI.prototype.__class__ = "CatAI";
