(function(window) {
body_instance_1 = function() {
	this.initialize();
}
body_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["birds.png"], frames: [[4,4,139,182,0,1,1]]});
var body_instance_1_p = body_instance_1.prototype = new createjs.Sprite();
body_instance_1_p.Sprite_initialize = body_instance_1_p.initialize;
body_instance_1_p.initialize = function() {
	this.Sprite_initialize(body_instance_1._SpriteSheet);
	this.paused = false;
}
window.body_instance_1 = body_instance_1;
left_wing_instance_1 = function() {
	this.initialize();
}
left_wing_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["birds.png"], frames: [[147,4,42,39,0,40.65,1]]});
var left_wing_instance_1_p = left_wing_instance_1.prototype = new createjs.Sprite();
left_wing_instance_1_p.Sprite_initialize = left_wing_instance_1_p.initialize;
left_wing_instance_1_p.initialize = function() {
	this.Sprite_initialize(left_wing_instance_1._SpriteSheet);
	this.paused = false;
}
window.left_wing_instance_1 = left_wing_instance_1;
right_wing_instance_1 = function() {
	this.initialize();
}
right_wing_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["birds.png"], frames: [[193,4,40,41,0,1,38.7]]});
var right_wing_instance_1_p = right_wing_instance_1.prototype = new createjs.Sprite();
right_wing_instance_1_p.Sprite_initialize = right_wing_instance_1_p.initialize;
right_wing_instance_1_p.initialize = function() {
	this.Sprite_initialize(right_wing_instance_1._SpriteSheet);
	this.paused = false;
}
window.right_wing_instance_1 = right_wing_instance_1;
}(window));

