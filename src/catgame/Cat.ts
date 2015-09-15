class Cat extends egret.Sprite{
	
    private Action1: egret.MovieClip;
    private Action2: egret.MovieClip;
    private IsAction1_mc: Boolean = true;

		public constructor() {
            super();
            //stay的猫
            var data = RES.getRes("stay_json");
            var texture = RES.getRes("stay_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, texture );
        this.Action1 = new egret.MovieClip( mcFactory.generateMovieClipData());    
            this.Action1.gotoAndPlay(0,-1);
       // console.log("11111");
     //围住的猫
            data =RES.getRes("weizhu_json");
            texture =RES.getRes("weizhu_png");
          var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, texture );
        this.Action2 = new egret.MovieClip( mcFactory.generateMovieClipData());
        this.Action2.gotoAndPlay(0,-1);
      //  console.log("22222");
        
             this.anchorX=0.5;
             this.anchorY=1;
            this.PlayAction();
            }

             public init (Index:number){
                 var p: egret.Point = Util.getPointXYByIndex(Index);
                 this.x = p.x;
                 this.y = p.y;
                this.IsAction1_mc=true;
                this.PlayAction();
              //  console.log("猫移动了");
             }
             public moveCat(Index: number,IsAction1:boolean) {
                       this.IsAction1_mc=IsAction1;
                     var p: egret.Point = Util.getPointXYByIndex(Index);
                    this.x = p.x;
                     this.y = p.y;
                 this.PlayAction();
             }
             
             public PlayAction():void{
            if(this.numChildren){
                this.removeChildAt(0);
            }
            if(this.IsAction1_mc){
                this.addChild(this.Action1);
            this.Action1.gotoAndPlay(0,-1);
            }else{
                this.addChild(this.Action2);
               this.Action2.gotoAndPlay(0,-1);
            }
        }          
            //测试函数
        /*
            public IsAction1():Boolean{
                return this.IsAction1;
            }
            public SetAction(val:Boolean){
                if(this.IsAction1_mc!=val){
                    this.IsAction1_mc=val;
                    this.PlayAction();
                }
            }
	*/
}
