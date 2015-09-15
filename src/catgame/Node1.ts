
class Node1 extends egret.Sprite{
        public index: number = 0;
    private redSkin: egret.Bitmap;
    private blackSkin: egret.Bitmap;
    public isOpen: boolean = true;
  //  public  map_array: Array<Node1> = [];
    //public cat: Cat;
    public disEvent: egret.EventDispatcher;
    
	public constructor() {
        super();
        //this.map_array = map_array;
        //this.cat = cat;
        this.redSkin = new egret.Bitmap();
        this.redSkin.texture= RES.getRes("pot2_png");
        this.blackSkin = new egret.Bitmap();
        this.blackSkin.texture= RES.getRes("pot1_png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.touchEnabled = true;
        this.addChild(this.blackSkin);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
         
	}
    public close() {
        if(this.isOpen) {
            this.isOpen = false;
            this.removeChild(this.blackSkin);
            this.addChild(this.redSkin);
        }
    }
    private onclick() {
        if(this.isOpen) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
            this.close();
            var evt: GameEvent = new GameEvent(GameEvent.MOVE_CAT);
              evt.move_cat_index = this.index;
              this.dispatchEvent(evt);
           // console.log("增加了障碍,发送了move_cat事件");
           
        }
        
    }
    
    //测试函数
    /*
    public getStatus(): boolean {
        return this.isOpen;
    }
    private catMove(Index:number) {
        var catAI: CatAI = new CatAI(this.map_array);
        var a:Array<number>=catAI.findRound(Index);
        this.removeChild(this.cat);
        this.cat.x = Util.getPointXYByIndex(a[0]).x;
        this.cat.y = Util.getPointXYByIndex(a[0]).y;
        this.addChild(this.cat);   
        }
	
	*/
	
}
