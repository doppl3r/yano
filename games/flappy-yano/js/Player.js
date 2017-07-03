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
            this.shape = new createjs.Shape();
            this.x;
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
