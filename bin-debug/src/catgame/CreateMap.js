/**
 *
 * @author
 *
 */
var CreateMap = (function (_super) {
    __extends(CreateMap, _super);
    function CreateMap(root, first_startGamePanel) {
        _super.call(this);
        this.gameVictory = new GameVictoryPanel(this.total);
        this.map_array = [];
        this.total = 0;
        this.init_cat_ip = 40; //初始猫的位置
        this.gailv = 0.2; //地图障碍出现的概率
        //this.re_root = root;
        this._rootview = root;
        this.first_startGamePanel = first_startGamePanel;
        var bgmap = new egret.Bitmap();
        bgmap.texture = RES.getRes("bg_jpg");
        this._rootview.addChild(bgmap); //添加背景
        this.createMap(); //添加底图
        if (!this.first_startGamePanel) {
            ///this._rootview.removeChild(this.startGamePanel)
            //this.startGamePanel.removeEventListener(GameEvent.START_GAME,this.initCat,this);
            //this.initCat();
            this.cat = new Cat(); //添加猫
            this.cat_ip = this.init_cat_ip; //初始化猫的位置
            this.cat_action1 = true;
            this.cat.init(this.cat_ip);
            this._rootview.addChild(this.cat);
        }
        else {
            this.startGamePanel = new StartGamePanel();
            this._rootview.addChild(this.startGamePanel); //添加开始面板
            this.startGamePanel.addEventListener(GameEvent.START_GAME, this.initCat, this);
        }
    }
    var __egretProto__ = CreateMap.prototype;
    __egretProto__.initCat = function () {
        this._rootview.removeChild(this.startGamePanel);
        this.startGamePanel.removeEventListener(GameEvent.START_GAME, this.initCat, this);
        this.cat = new Cat(); //添加猫
        this.cat_ip = this.init_cat_ip; //初始化猫的位置
        this.cat_action1 = true;
        this.cat.init(this.cat_ip);
        this._rootview.addChild(this.cat);
        this.first_startGamePanel = 0;
        console.log("添加猫");
    };
    __egretProto__.createMap = function () {
        var len = 81;
        for (var i = 0; i < len; i++) {
            var node1 = new Node1();
            node1.index = i;
            this.map_array.push(node1);
            if (Math.random() < this.gailv && i != 40) {
                node1.close();
            }
            else {
                node1.addEventListener(GameEvent.MOVE_CAT, this.MoveCat, this);
            }
        }
        this.showMap();
        this.catAI = new CatAI(this.map_array);
    };
    __egretProto__.MoveCat = function () {
        this.total++;
        var isAction1 = true;
        var cat_new_ip;
        var nextIndex = this.catAI.findNextIndex(this.cat_ip);
        if (nextIndex) {
            cat_new_ip = nextIndex;
            if (this.catAI.isExit(nextIndex)) {
                this.cat_action1 = false;
                this.cat.moveCat(cat_new_ip, this.cat_action1);
                this.cat_ip = cat_new_ip;
                //var gameOverPanel: GameOverPanel;
                this.gameOverPanel = new GameOverPanel();
                this.result = "fail";
                this._rootview.addChild(this.gameOverPanel);
                console.log("失败!!!!");
                this.gameOverPanel.addEventListener(GameEvent.RE_PLAY, this.restart, this);
            }
            else {
                this.cat.moveCat(cat_new_ip, this.cat_action1);
                this.cat_ip = cat_new_ip;
            }
        }
        else {
            cat_new_ip = this.catAI.getCatRound(this.cat_ip); //随机下一个点
            this.cat_action1 = false;
            if (cat_new_ip) {
                this.cat.moveCat(cat_new_ip, this.cat_action1);
                this.cat_ip = cat_new_ip;
            }
            else {
                this.result = "victory";
                //var gameVictory: GameVictoryPanel=new GameVictoryPanel(this.total);
                this.gameVictory = new GameVictoryPanel(this.total);
                this._rootview.addChild(this.gameVictory);
                //console.log("成功!!!!");
                this.gameVictory.addEventListener(GameEvent.RE_PLAY, this.restart, this);
            }
        }
    };
    __egretProto__.showMap = function () {
        var len = 81;
        for (var i = 0; i < len; i++) {
            var p = Util.getPointXYByIndex(this.map_array[i].index);
            this.map_array[i].x = p.x;
            this.map_array[i].y = p.y;
            this._rootview.addChild(this.map_array[i]);
        }
    };
    __egretProto__.onComplete = function (event) {
        console.log(this.urlloader.data);
    };
    __egretProto__.restart = function () {
        //this.urlloader = new egret.URLLoader(new egret.URLRequest("index.php/Home/Index/update/result/"+this.result+"/step/"+this.total));
        this.urlloader = new egret.URLLoader();
        this.urlreq = new egret.URLRequest();
        this.urlreq.url = "http://192.168.2.168/CatchTheCat/index.php/Home/Index/update/result/" + this.result + "/step/" + this.total;
        this.urlloader.load(this.urlreq);
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        for (var i = 0; i < 81; i++) {
            this.map_array[i].removeEventListener(GameEvent.MOVE_CAT, this.MoveCat, this);
            for (var j = 0; j < 2; j++) {
                this.catAI.map[i][j] = null;
                console.log(this.catAI.map[i][j]);
            }
        }
        while (this.map_array.length)
            this.map_array.pop();
        console.log("移除监听");
        this.catAI = null;
        this.startGamePanel = null;
        this.gameVictory = null;
        this.gameOverPanel = null;
        //this.catAI.map.length = 0;
        this.cat = null;
        console.log("CreateMap侦听到重新开始事件");
        this.map_array.length = 0;
        var evt = new GameEvent(GameEvent.RE_PLAY);
        this.dispatchEvent(evt);
        // var re: CreateMap = new CreateMap(this._rootview,this.first_startGamePanel);
        // re._rootview.removeChild(re.startGamePanel);
        // this.CollectGarbage();
    };
    return CreateMap;
})(egret.EventDispatcher);
CreateMap.prototype.__class__ = "CreateMap";
