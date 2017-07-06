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
                frames: [[4,4,139,182,0,69.5,91], [147,4,42,39,0,32,24], [193,4,40,41,0,10,24]],
                animations: { b1: [0], l1: [1], r1: [2] }
            });
            this.s_body = new createjs.Sprite(this.spriteSheet, "b1");
            this.s_leftWing = new createjs.Sprite(this.spriteSheet, "l1");
            this.s_leftWing.x = -60;
            this.s_leftWing.y = -48;
            this.s_leftWing.rotation = 45;
            this.s_rightWing = new createjs.Sprite(this.spriteSheet, "r1");
            this.s_rightWing.x = 64;
            this.s_rightWing.y = -48;
            this.s_rightWing.rotation = -45;
            this.addChild(this.s_rightWing, this.s_body, this.s_leftWing);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.rotation = 15;
            this.gravity = Object.create(window.gravity);
            this.gravity.set(40,750);
            this.respawn();
        };
        this.tick = function (delta, map) {
            //check collision using 'ndgmr.Collision.js' provided by Olaf Horstmann
            /*var tempChest;
            for (var i=0; i<window.Game.chestManager.children.length; i++){
                tempChest = window.Game.chestManager.getChildAt(i); //get temporary index
                if (ndgmr.checkRectCollision(this, tempChest)){

                }
            }*/
            if (this.pauseJump != null) this.y = this.gravity.pull(); //move player
            //prevent play from falling off screen
            if (this.y > window.Game.getHeight()) this.respawn();
            //flap the wings
            if (this.animate != false){
                this.animate = false;
                createjs.Tween.get(this.s_leftWing).to({ rotation: -135, y: 0 }, 100).to({ rotation: 45, y: -48 }, 100).call(function(tween){ createjs.Tween.removeTweens(tween._target); tween._target.parent.animate = true; });
                createjs.Tween.get(this.s_rightWing).to({ rotation: 135, y: 0 }, 100).to({ rotation: -45, y: -48 }, 100).call(function(tween){ createjs.Tween.removeTweens(tween._target); tween._target.parent.animate = true; });
            }
        };
        this.jump = function(amplitude, duration) {
            this.pauseJump = false;
            this.gravity.push(0, this.y);
        };
        this.respawn = function(resetNewSpawn) {
            this.pauseJump = null;
            this.x = 240;
            this.y = 360;
            this.gravity.reset();
            this.gravity.push(0.5, this.y);
        };

        //initiate prototype variables
        this.init();
	}
}(window));
