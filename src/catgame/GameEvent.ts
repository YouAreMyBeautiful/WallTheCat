/**
 *
 * @author 
 *
 */
class GameEvent extends egret.Event {
    public static OPEN_TILE:string = "open_tile";
    public static MOVE_CAT: string = "move_cat";
    public static RE_MOVE: string = "re_move";
    public static RE_PLAY: string = "re_play";
    public static START_GAME: string = "start_game";
    public open_tile_index: number= 0;
    public move_cat_index: number = 0;
    
	public constructor(type:string ,bubbles:boolean=false,cancelable:boolean=false) {
        super(type,bubbles,cancelable);
	}
}
