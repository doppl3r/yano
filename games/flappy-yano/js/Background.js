(function (window) {

    //extend & promote createjs.Container functions to window
    createjs.extend(Background, createjs.Container);
    window.Background = createjs.promote(Background, "Container");

    //main prototype
	function Background() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.Container_constructor(); //inherit container constructor
            this.buildBackground();
        };
        this.tick = function(delta) {
            //animate city
            for (var i=0; i < this.children.length; i++){
                var city = this.getChildAt(i);
                city.x -= delta * city.speed; //move buildings left
                if (city.x < city.startX-1280) city.x = (city.x % 1280) + city.startX; //reset position
            }
        };
        this.buildBackground = function(){
            this.addCity("city", 0,480,0.1);
            this.addCity("city", 1280,480,0.1);
        }
        this.addCity = function(type, x, y, speed){
            var obs = new createjs.Container();
            obs.addChild(new createjs.Bitmap(this.getAsset(type)));
            obs.x = obs.startX = x;
            obs.y = obs.startY = y;
            obs.alpha = 0.1;
            obs.speed = speed;
            this.addChild(obs);
        };
        this.getAsset = function(name){
            return window.Game.assetManager.preload.getResult(name);
        }

        //initiate prototype variables
        this.init();
    }
}(window));
