(function (window) {

    //extend & promote createjs.Container functions to window
    createjs.extend(Things, createjs.Container);
    window.Things = createjs.promote(Things, "Container");

    //main prototype
	function Things() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.Container_constructor(); //inherit container constructor
            //this.buildLevel();
        };
        this.tick = function(delta) {
            //spawn more things randomly
            if (this.spawnTimer > 0 && this.spawnTimer != null){
                this.spawnTimer -= delta * 0.5;
            }
            else {
                this.spawnTimer = 500;
                switch(window.Game.getRandomInt(0,4)){
                    case(0): this.spawnItem = "pen"; break;
                    case(1): this.spawnItem = "pencil-1"; break;
                    case(2): this.spawnItem = "pencil-2"; break;
                    case(3): this.spawnItem = "razer"; break;
                    case(4): this.spawnItem = "scissors"; break;
                }
                this.addThing(this.spawnItem, 1280,720,0.5);
            }

            //animate things
            for (var i=0; i < this.children.length; i++){
                var thing = this.getChildAt(i);
                thing.x -= delta * thing.speed;

                //check player collision
                if (ndgmr.checkRectCollision(window.Game.player, thing)){
                    console.log("hit");
                    this.removeChildAt(i);
                }
            }
        };
        this.buildLevel = function(){
            this.addThing("pencil-1", 480,0,0.25);
        }
        this.addThing = function(type, x, y, speed){
            var obs = new createjs.Container();
            obs.addChild(new createjs.Bitmap(this.getAsset(type)));
            obs.x = x;
            obs.y = y;
            obs.regX = obs.getBounds().width / 2;
            obs.regY = obs.getBounds().height / 2;
            obs.rotation = window.Game.getRandomInt(-15,15);
            obs.speed = speed;
            if (type.indexOf('logo') > -1) obs.hurt = true; //kills player if touched
            this.addChild(obs);
        };
        this.removeThing = function(){

        };
        this.getAsset = function(name){
            return window.Game.assetManager.preload.getResult(name);
        }

        //initiate prototype variables
        this.init();
    }
}(window));
