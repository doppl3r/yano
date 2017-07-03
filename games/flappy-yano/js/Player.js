(function (window) {

    //extend & promote createjs.Container functions to window
    createjs.extend(Player, createjs.Container);
    window.Player = createjs.promote(Player, "Container");

    //main prototype
	function Player() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.Container_constructor(); //inherit container constructor
            this.spriteSheet = new createjs.SpriteSheet({
                images: [window.Game.assetManager.preload.getResult("birds")],
                frames: [[4,4,139,182,0,69.5,91], [147,4,42,39,0,21,19.5], [193,4,40,41,0,20,20.5]],
                animations: { b1: [0], l1: [1], r1: [2] }
            });
            this.s_body = new createjs.Sprite(this.spriteSheet, "b1");
            this.s_leftWing = new createjs.Sprite(this.spriteSheet, "l1");
            this.s_rightWing = new createjs.Sprite(this.spriteSheet, "r1");
            this.addChild(this.s_body, this.s_leftWing, this.s_rightWing);
            this.x = 640;
            this.y = 360;
        };
        this.tick = function (delta, map) {
            //check collision using 'ndgmr.Collision.js' provided by Olaf Horstmann
            /*var tempChest;
            for (var i=0; i<window.Game.chestManager.children.length; i++){
                tempChest = window.Game.chestManager.getChildAt(i); //get temporary index
                if (ndgmr.checkRectCollision(this, tempChest)){

                }
            }*/
        };
        this.jump = function(amplitude, duration) {
            
        };
        this.respawn = function(resetNewSpawn) { 

         };

        //initiate prototype variables
        this.init();
	}
}(window));
