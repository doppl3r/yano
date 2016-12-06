//Cards Class
(function (window) {
    //constructor
    function EndGraphics() {
        this.Container_constructor();
    }

    var container = createjs.extend(EndGraphics, createjs.Container); //instance of class

    //check all EndGraphics inside this container
    container.tick = function (delta) {}
    container.fadeIn = function(){
        this.pickRandomGraphic();
        createjs.Tween.get(this, {override:false}).wait(0).to({alpha: 1}, 2500, createjs.Ease.sineInOut)
        .call(function(){ window.Game.checkHighScore(window.timer.stopTime); });
    }
    container.fadeOut = function(){
        createjs.Tween.get(this, {override:false}).to({alpha: 0}, 250, createjs.Ease.sineInOut);
    }
    container.pickRandomGraphic = function(){
        this.removeAllChildren();
        //check manifest for existing end graphics
        var totalOptions = 0;
        var tempAssetList = window.Game.assetManager.getManifest().slice(0);
        var tempAssetListLength = tempAssetList.length;
        for (var i=tempAssetListLength-1; i>=0; i--){
            if (tempAssetList[i].end == "true"){
                totalOptions++;
            }
        }
        this.graphic = new createjs.Bitmap(window.Game.assetManager.preload.getResult("end_graphic_"+this.getRandomInt(1,totalOptions)));
        this.alpha = 0; //start faded;
        this.addChild(this.graphic);
    }
    container.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.EndGraphics = createjs.promote(EndGraphics, "Container");
}(window));
