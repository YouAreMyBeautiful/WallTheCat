/**
 *
 * @author 
 *
 */
class CatAI {
	public constructor(map_array: Array<Node1>) {
        this.map_array = map_array;
        this.map = new Array(81);
		}
    public map_array:Array<Node1>;
    public map: Array<number>[];
    
    
 public findNextIndex(from: number): number {
     
         var i: number;  
     var path: Array<number> = this.findRound(from);//起点周围可行点
     var que: Array<number>=new Array();
     for(i = 0;i < 81;i++) {
         this.map[i] = new Array(2);//申请一个二维数组
         this.map[i][0] = 1000;//到起点最短的距离,初始距离最大
         this.map[i][1] = -1;    //表示最短路径上一个节点的位置
       
     }
     this.map[from][0] = 1;
     var visit: Array<number>=new Array(81);//标记数组
     for(i = 0;i < visit.length;i++)visit[i] = 0;//初始化标记数组
     visit[from] = 1;
     for(i= 0;i < path.length;i++) {//将起点周围可行点入栈
         que.unshift(path[i]);
         this.map[path[i]][0] = 1;
         this.map[path[i]][1] = from;
      
     }
     while(que.length) {
         
         var n: number= que.pop();
         if(this.isExit(n)) {  //找到出口
             var nextIndex = this.findLastIndex(n,from);
             return nextIndex;
         }
              visit[n] = 1;//已经访问过，标记
             var arr1: Array<number> = this.findRound(n);
             var arr: Array<number>=new Array();
             var arr_len: number = 0;
             for(i = 0;i < arr1.length;i++)//周围可行点,且之前没有走过
                 if(!visit[arr1[i]]) arr[arr_len++] = arr1[i];
             
                 for( i= 0;i < arr.length;i++) {//新的点周围的可行点入栈
                 var p = arr[i];
                 var stpe = this.map[n][0] + 1;
                 if(!visit[p]&&stpe<this.map[p][0]) {
                     que.unshift(p);
                     this.map[p][0] = stpe;
                     this.map[p][1] = n;
                     visit[p] = 1;
                 }
             }
         
         //console.log("ok");
     }
     return 0;//没有找到出路被围住
    }
    public findLastIndex(outIndex: number,from:number): number {
        var lastIndex = this.map[outIndex][1];
        
        if(lastIndex !=from) return this.findLastIndex(lastIndex,from);
        else return outIndex;
    }
    
    public isExit(index: number): boolean {
        var p: egret.Point = Util.getPointByIndex(index);
        if(p.y == 0 || p.y == 8 || p.x == 0 || p.x == 8) return true;
        else return false;
    }
    public getCatRound(catIndex: number): number {
        var round: Array<number> = this.findRound(catIndex);
        if(round.length)
            return round[0];
        else return 0;
    }
    public findRound(_from: number): Array<number> {
        var arr: Array<number> = [];
        var p: egret.Point = Util.getPointByIndex(_from);
        var row: number = p.x;//行
        var col: number = p.y;//列
        
        var left: number = col - 1;//左边点
        if(left >= 0 && this.map_array[Util.getIndexByPoint(new egret.Point(row,left))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(row,left)));
        }
      
        var right: number = col + 1;//右边点
        if(right <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(row,right))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(row,right)));
        }

        var top1: number = row - 1;//上方第一个点
        if(top1 >= 0 && this.map_array[Util.getIndexByPoint(new egret.Point(top1,col))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(top1,col)));

        }
        var buttom1: number = row + 1;//右下第一个点
        if(buttom1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1,col))].isOpen) {
            arr.push(Util.getIndexByPoint(new egret.Point(buttom1,col)));
        }
        if(row % 2) {
            var top2: number = row - 1;//上方第二个点
            if(top2 >= 0 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(top1,col + 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(top1,col + 1)));
            }

            var buttom2: number = row + 1;//右下第二个点
            if(buttom2 <= 8 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1,col + 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(buttom1,col + 1)));
            }
        }
        else {
            var top2: number = row - 1;//上方第二个点
            if(top2 >= 0 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(top1,col - 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(top1,col - 1)));
            }
            
            var buttom2: number = row + 1;//右下第二个点
            if(buttom2 <= 8 && col + 1 <= 8 && this.map_array[Util.getIndexByPoint(new egret.Point(buttom1,col - 1))].isOpen) {
                arr.push(Util.getIndexByPoint(new egret.Point(buttom1,col - 1)));
            }
        
        }
        return arr;
    }    
}
