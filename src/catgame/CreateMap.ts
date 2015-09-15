/**
 *
 * @author 
 *
 */
class CreateMap extends egret.EventDispatcher{
    public _rootview: egret.DisplayObjectContainer;
    private _textures: egret.SpriteSheet;
    private node1: Node1;
    public startGamePanel: StartGamePanel;//开始界面面板
    public gameVictory: GameVictoryPanel=new GameVictoryPanel(this.total);
    public gameOverPanel;
    private re_root: egret.DisplayObjectContainer;
    public  map_array: Array<Node1> = [];
    public cat: Cat;
    public catAI: CatAI;
    public cat_ip: number;
    public result: string;
    public cat_action1: boolean;
    public total: number = 0;
    public first_startGamePanel: number ;//开始面板是不是第一次加载
    public init_cat_ip: number=40;//初始猫的位置
    public gailv: number=0.2;//地图障碍出现的概率
    private urlloader:egret.URLLoader; //URLLoader对象负责网络的连接状态操作，同时负责接收网络回传的数据。 
    private urlreq:egret.URLRequest; //URLRequest对象负责网络通信数据 
    public constructor(root: egret.DisplayObjectContainer,first_startGamePanel:number) {
        super();
        //this.re_root = root;
        this._rootview = root;
        this.first_startGamePanel = first_startGamePanel;
       
        
        var bgmap: egret.Bitmap = new egret.Bitmap();
        bgmap.texture = RES.getRes("bg_jpg");
       this._rootview.addChild(bgmap);//添加背景
       
        this.createMap();//添加底图
       
        
      
        if(!this.first_startGamePanel) {//是不是第一次加载开始面板
            ///this._rootview.removeChild(this.startGamePanel)
            //this.startGamePanel.removeEventListener(GameEvent.START_GAME,this.initCat,this);
            //this.initCat();
            this.cat = new Cat();//添加猫
            this.cat_ip = this.init_cat_ip;  //初始化猫的位置
            this.cat_action1 = true;
            this.cat.init(this.cat_ip);
            this._rootview.addChild(this.cat);
        } else {
            this.startGamePanel = new StartGamePanel();
            this._rootview.addChild(this.startGamePanel);//添加开始面板
            this.startGamePanel.addEventListener(GameEvent.START_GAME,this.initCat,this);
        }
    }
    private initCat(){
        this._rootview.removeChild(this.startGamePanel)
        this.startGamePanel.removeEventListener(GameEvent.START_GAME,this.initCat,this);
        this.cat = new Cat();//添加猫
        this.cat_ip = this.init_cat_ip;//初始化猫的位置
        this.cat_action1 = true;
        this.cat.init(this.cat_ip);
        this._rootview.addChild(this.cat);
        this.first_startGamePanel = 0;
        console.log("添加猫");
    }
    private createMap(){
        var len: number = 81;
        for(var i: number = 0;i < len;i++) {
            var node1: Node1 = new Node1();
            node1.index = i;
            this.map_array.push(node1);             
            if(Math.random() < this.gailv && i != 40) {
                node1.close();
            }
            else {

                node1.addEventListener(GameEvent.MOVE_CAT,this.MoveCat,this)
            }
           // this.total = node1.total;
        }
        this.showMap();
        this.catAI = new CatAI(this.map_array);
	}
	
    private MoveCat() {
        this.total++;
        var isAction1: boolean = true;
        var cat_new_ip: number;
        var nextIndex=this.catAI.findNextIndex(this.cat_ip);
        if(nextIndex) {//找到最短路径能出去
            cat_new_ip = nextIndex;
            if(this.catAI.isExit(nextIndex)) {  //是出口
                this.cat_action1 = false;
                this.cat.moveCat(cat_new_ip,this.cat_action1);
                this.cat_ip = cat_new_ip;
                //var gameOverPanel: GameOverPanel;
               this.gameOverPanel = new GameOverPanel();
               this.result = "fail";
                this._rootview.addChild(this.gameOverPanel);
                console.log("失败!!!!");
                this.gameOverPanel.addEventListener(GameEvent.RE_PLAY,this.restart,this);
            } else {
                this.cat.moveCat(cat_new_ip,this.cat_action1);
                this.cat_ip = cat_new_ip;
            }
        }
        else {//没有找到最短路径，被围住
             cat_new_ip=this.catAI.getCatRound(this.cat_ip);//随机下一个点
            this.cat_action1 = false;
            if(cat_new_ip){
                this.cat.moveCat(cat_new_ip,this.cat_action1);
                this.cat_ip = cat_new_ip;
            }
            else {
                this.result = "victory";
                //var gameVictory: GameVictoryPanel=new GameVictoryPanel(this.total);
               this.gameVictory = new GameVictoryPanel(this.total);
                this._rootview.addChild(this.gameVictory);
                //console.log("成功!!!!");
                this.gameVictory.addEventListener(GameEvent.RE_PLAY,this.restart,this);
                
            }
        }
    }
    private showMap() {
        var len: number = 81;
        for(var i: number = 0;i < len;i++){
            var p: egret.Point = Util.getPointXYByIndex(this.map_array[i].index);
            this.map_array[i].x = p.x;
            this.map_array[i].y = p.y;
            this._rootview.addChild(this.map_array[i]);
        }
    }
    private onComplete(event:egret.Event):void{ 
        console.log(this.urlloader.data); 
    } 
    private restart() {
       //this.urlloader = new egret.URLLoader(new egret.URLRequest("index.php/Home/Index/update/result/"+this.result+"/step/"+this.total));
        this.urlloader = new egret.URLLoader();
        this.urlreq = new egret.URLRequest();
        this.urlreq.url = "http://192.168.2.168/CatchTheCat/index.php/Home/Index/update/result/"+this.result+"/step/"+this.total;
        this.urlloader.load(this.urlreq); 
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete,this); 
     
        //this.gameOverPanel.removeEventListener(GameEvent.RE_PLAY,this.restart,this);
        //this.gameVictory.removeEventListener(GameEvent.RE_PLAY,this.restart,this);
        for(var i: number = 0;i < 81;i++) {
            this.map_array[i].removeEventListener(GameEvent.MOVE_CAT,this.MoveCat,this);
            // 
           // this.map_array[i].length = 0;
            for(var j = 0;j < 2;j++) {
                this.catAI.map[i][j] = null;
                console.log(this.catAI.map[i][j]);
            }
        }
        while(this.map_array.length)this.map_array.pop();
        console.log("移除监听");
        this.catAI = null;
        this.startGamePanel = null;
        this.gameVictory = null;
        this.gameOverPanel = null;
        
        //this.catAI.map.length = 0;
        this.cat = null;
        console.log("CreateMap侦听到重新开始事件");
        this.map_array.length = 0;   
        var evt :GameEvent= new GameEvent(GameEvent.RE_PLAY);
        this.dispatchEvent(evt);
        
       // var re: CreateMap = new CreateMap(this._rootview,this.first_startGamePanel);
       // re._rootview.removeChild(re.startGamePanel);
       // this.CollectGarbage();
      
        }
    //测试函数   
    /*
    private MoveCat_1() {
        this.total++;
        var isAction1: boolean = false;
        var cat_new_ip: number;
        var v:number=this.catAI.getCatRound(this.cat_ip);//随机下一个点
        if(v){
             cat_new_ip = v;
            this.cat.moveCat(cat_new_ip,isAction1);
            this.cat_ip = cat_new_ip;
        }
        else {
            var gameOverPanel: GameOverPanel;
            gameOverPanel = new GameOverPanel();
            this._rootview.addChild(gameOverPanel);
            console.log("失败!!!!");
            gameOverPanel.addEventListener(GameEvent.RE_PLAY,this.restart,this);
        }
        
        
    }
   */
    
 }
