(function (window) {

    //extend & promote createjs.Container functions to window
    createjs.extend(Obstacles, createjs.Container);
    createjs.extend(Obstacle, createjs.Container);
    window.Obstacles = createjs.promote(Obstacles, "Container");
    window.Obstacle = createjs.promote(Obstacle, "Container");

    //main prototype
	function Obstacles() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.Container_constructor(); //inherit container constructor
            this.buildLevel();
        };
        this.tick = function(delta) {
            
        };
        this.buildLevel = function(){
            this.addObstacle("pencil", 0,0,1);
        }
        this.addObstacle = function(type, x, y, speed){
            var obs = new createjs.Container();
            obs.addChild(new createjs.Bitmap(this.getAsset(type)));
            obs.x = x;
            obs.y = y;
            obs.speed = speed;
            if (type.indexOf('logo') > -1) obs.hurt = true; //kills player if touched
            this.addChild(obs);
        };
        this.removeObstacle = function(){

        };
        this.getAsset = function(name){
            return window.Game.assetManager.preload.getResult(name);
        }

        //initiate prototype variables
        this.init();
    }
    
    function Obstacle(){

    }
}(window));
