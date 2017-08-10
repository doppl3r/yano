(function (window) {

	//add prototype to window
	window.Game = new Game();

	//main prototype
	function Game(){
		//prototype functions
		this.init = function() {
			//initiate object variables
			this.showFPS = false;
			this.gamePaused = false;
			this.initStage();
			this.addGameListeners();
		};
		this.tick = function(event){
			this.delta = event.delta; //elapsedTimeInMS / 1000msPerSecond
			this.player.tick(this.delta);
			this.stage.update();
		};
		this.initStage = function(){
			//init stage from canvas
			this.canvas = document.getElementById("gameCanvas");
			this.stage = new createjs.StageGL(this.canvas, { antialias: true });
			this.stage.setClearColor("#ffffff");
			this.stage.enableMouseOver(60);
			createjs.Touch.enable(this.stage);
			this.resizeCanvas();

			//init preload
			this.assetManager = new AssetManager(this.canvas.width, this.canvas.height, this.em);
			this.stage.addChild(this.assetManager);
		};
		this.setStage = function() {
			//the stage should only be set after the assets have been preloaded
			this.player = new Player();
			this.obstacles = new Obstacles();
			this.stage.addChild(this.player, this.obstacles);

			//start game timer
			if (!createjs.Ticker.hasEventListener("tick")) {
				createjs.Ticker.addEventListener("tick", function(event){ window.Game.tick(event); });
				createjs.Ticker.timingMode = createjs.Ticker.RAF;
			}
		};
		this.stageMouseDown = function(event){ this.player.jump(); };
		this.stageMouseMove = function(event){};
		this.stageMouseUp = function(event){};
		this.scrollWheel = function(e){};
		this.getWidth = function(){ return this.canvas.width; };
		this.getHeight = function(){ return this.canvas.height; };
		this.resizeCanvas = function(){
			var content = document.getElementById("content");
			content.style.height = window.innerHeight+"px";
			content.style.width = (this.canvas.width/this.canvas.height)*parseInt(content.style.height)+"px";
			if (parseInt(content.style.width) > window.innerWidth) content.style.width = window.innerWidth + "px";
		};
		this.pauseGame = function(){};
		this.resumeGame = function(retry){};
		this.retry = function(retry){};
		this.escapeKey = function(){};
		this.handleKeyDown = function(e) {
			if (!e) { var e = window.event; } //cross browser issues exist
			switch (e.keyCode) {
				case 16: /**/ break; //shift
				case 17: /**/ break; //ctrl
				case 27: /**/ break; //esc
				case 32: window.Game.player.jump(); break; //space
				case 37: /**/ break; //left
				case 39: /**/ break; //right
				case 46: /**/ break; //delete
				case 65: /**/ break; //a
				case 68: /**/ break; //d
			}
		};
		this.handleKeyUp = function(e){};
		this.doScroll = function (e) { e=window.event || e; this.scrollWheel(e); e.preventDefault(); };
		this.playMusic = function(){ /*createjs.Sound.play("track", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});*/ };
		this.stopMusic = function(){ createjs.Sound.stop(); };
		this.muteVolume = function(){ createjs.Sound.volume = 0; };
		this.unmuteVolume = function(){ createjs.Sound.volume = 1; };
		this.getVolume = function(){ return createjs.Sound.volume; };
		this.setVolume = function(volume){ createjs.Sound.volume = volume; };
		this.addGameListeners = function(){
			//phonegap listeners
			document.addEventListener("deviceready", function(){ StatusBar.hide(); }, false);
			document.addEventListener("pause", function(){ window.Game.pauseGame(); window.Game.stopMusic(); }, false);
			document.addEventListener("resume", function(){ window.Game.playMusic(); StatusBar.hide(); }, false);
			document.addEventListener("backbutton", function(){  }, false);
			//desktop listeners
			document.onkeydown = this.handleKeyDown;
			document.onkeyup = this.handleKeyUp;
			if (window.addEventListener) {
				window.addEventListener("mousewheel", function(event){ window.Game.doScroll(event); }, false);
				window.addEventListener("DOMMouseScroll", function(event){ window.Game.doScroll(event); }, false);
			} else { window.attachEvent("onmousewheel", function(event){ window.Game.doScroll(event); }); }
			window.addEventListener('resize', function(){ window.Game.resizeCanvas(); });
			//touch listeners
			this.stage.on("stagemousedown", function(event){ window.Game.stageMouseDown(event); });
			this.stage.on("stagemousemove", function(event){ window.Game.stageMouseMove(event); });
			this.stage.on("stagemouseup", function(event){ window.Game.stageMouseUp(event); });
			//preload listeners
			this.assetManager.preload.on("complete", function(){ window.Game.setStage(); window.Game.playMusic(); });
			this.assetManager.preload.on("progress", function(){ window.Game.assetManager.updateLoading(); window.Game.stage.update(); });
		};

		//initiate prototype variables
		this.init();
	}
}(window));