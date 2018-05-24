<!DOCTYPE html>
<html>
	<head>
		<title>Space Invaders</title>
		<link rel="stylesheet" type="text/css" href="css/spaceInvaders.css">
	</head>
	<body>
		<div id="content">
			<canvas id="gameCanvas" width="960" height="600" style="background:black;"></canvas>
		</div>
	</body>
</html>
<script type="text/javascript" src="createjs.min.js"></script>
<script type="text/javascript">

	var KEYCODE_ENTER = 13;
	var KEYCODE_SPACE = 32;
	var KEYCODE_LEFT = 37;
	var KEYCODE_RIGHT = 39;

	var spaceship;

	var canvas;

	var bulletsLenght = 0;
	var bullets = [];

	var invaders = [];

	function init() {
	    canvas = new createjs.Stage("gameCanvas");
	    
	    spaceship = new createjs.Bitmap("img/spaceship.png");
	    spaceship.y = canvas.canvas.height - 50;
	    spaceship.x = (canvas.canvas.width - spaceship.image.width) / 2;
	    
	    canvas.addChild(spaceship);

	    initInvaders("img/orange.png", 150);
	    initInvaders("img/blue.png", 220);
	    initInvaders("img/green.png", 290);

	    for(var i=0;i<invaders.length;i++) {
	    	canvas.addChild(invaders[i]);	
	    }
	    
	    canvas.update();
	}	

	function initInvaders(img, posY) {	
		for(var i=0;i<8;i++) {
			invader = new createjs.Bitmap(img);
			invader.y = posY; 
			invader.x = 100*(i+1);
			invaders.push(invader);
		}
	}

    function keyPressed(event) {
		switch(event.keyCode) {
			case KEYCODE_LEFT: spaceship.x -= 5; break;
			case KEYCODE_RIGHT: spaceship.x += 5; break;
		}
		if(KEYCODE_SPACE == event.keyCode) {
			createBullet();
		}
		canvas.update();
	}

	function createBullet() {

		bullet = new createjs.Shape();
		bullet.graphics.beginFill('#FFFFFF').drawRect(0,0,3,6);
	    bullet.y = canvas.canvas.height - 50;
	    bullet.x = spaceship.x + spaceship.image.width/2 - 1;

		bullets[bulletsLenght] = bullet;
	    canvas.addChild(bullets[bulletsLenght]);
	    bulletsLenght++;
	}

	createjs.Ticker.addEventListener("tick", tick);
	function tick() {
		for(var i=0;i<bulletsLenght;i++) {
			bullets[i].y -= 5;
		}
		canvas.update();
	}

	init();
    document.onkeydown = keyPressed;	
</script>