/**
 *
 * @author 
 *
 */
class Util  {
    public static getPointByIndex(index:number):egret.Point{
        var point: egret.Point = new egret.Point();
        point.y = index % 9;
        point.x = Math.floor(index / 9);
        return point;
        //将第几个点转成几行几列
    }
   
    public static getPointXYByIndex(index: number): egret.Point {
        var point: egret.Point = new egret.Point();
        var space: number = 0;
        if(Math.floor(index /9%2) == 1) {
            space = 25;
            
        }
        point.x = 50 + 45 * (index % 9) + space;
        point.y = 370 + 45 * Math.floor(index / 9);
        return point;
        //将第几个点转换成XY坐标
    }
    public static getIndexByPoint(p: egret.Point): number {
        var index: number = p.x * 9 + p.y;
        return index;
        //将几行几列转成第几个点
    }
    
}
