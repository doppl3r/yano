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
                this.spawnTimer -= delta;
            }
            else {
                this.spawnTimer = 1500;
                this.top = !this.top;
                //randomize lethal item
                switch(window.Game.getRandomInt(0,4)){
                    case(0): this.spawnItem = "pen"; break;
                    case(1): this.spawnItem = "pencil-1"; break;
                    case(2): this.spawnItem = "pencil-2"; break;
                    case(3): this.spawnItem = "razer"; break;
                    case(4): this.spawnItem = "scissors"; break;
                }
                //randomize reward
                switch(window.Game.getRandomInt(0,7)){
                    case(0): this.rewardItem = "icon-facebook"; break;
                    case(1): this.rewardItem = "icon-google"; break;
                    case(2): this.rewardItem = "icon-instagram"; break;
                    case(3): this.rewardItem = "icon-linkedin"; break;
                    case(4): this.rewardItem = "icon-pinterest"; break;
                    case(5): this.rewardItem = "icon-twitter"; break;
                    case(6): this.rewardItem = "icon-youtube"; break;
                }
                this.addThing(this.spawnItem, 1280, this.top ? -20 : 660, 0.5, false); //danger
                this.addThing(this.rewardItem, 1640, this.top ? 120 : 540, 0.55, true); //reward
            }

            //animate things
            for (var i=0; i < this.children.length; i++){
                var thing = this.getChildAt(i);
                thing.x -= delta * thing.speed;

                //check player collision
                if (ndgmr.checkRectCollision(window.Game.player, thing)){
                    if (thing.reward == true) {
                        //TODO: add points
                        this.removeChildAt(i);
                    }
                    else this.resetLevel();
                }

                //remove if not on screen
                //if (thing.x < -1280) this.removeChildAt(i);
            }
        };
        this.buildLevel = function(){
            this.addThing("pencil-1", 480,0,0.25);
        }
        this.addThing = function(type, x, y, speed, reward){
            var obs = new createjs.Container();
            obs.addChild(new createjs.Bitmap(this.getAsset(type)));
            obs.x = x;
            obs.y = y;
            obs.regX = obs.getBounds().width / 2;
            obs.regY = obs.getBounds().height / 2;
            obs.rotation = window.Game.getRandomInt(-10,10);
            obs.reward = reward;
            if (y <= 0) obs.rotation += 180; //rotate the thing if it on the top level of the screen
            obs.speed = speed;
            if (type.indexOf('logo') > -1) obs.hurt = true; //kills player if touched
            this.addChild(obs);
        };
        this.removeThing = function(){

        };
        this.getAsset = function(name){
            return window.Game.assetManager.preload.getResult(name);
        }
        this.resetLevel = function(){
            window.Game.player.respawn();
            this.removeAllChildren();
        }

        //initiate prototype variables
        this.init();
    }
}(window));
