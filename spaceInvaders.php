<!DOCTYPE html>
<html>
	<head>
		<title>Space Invaders</title>
		<link rel="stylesheet" type="text/css" href="css/spaceInvaders.css">
	</head>
	<body>
		<div id="content">
			<canvas id="gameCanvas" width="960" height="600"></canvas>
		</div>
	</body>
</html>
<script type="text/javascript" src="createjs.min.js"></script>
<script type="text/javascript" src="ndgmr.Collision.js"></script>
<script type="text/javascript">

	var KEYCODE_ENTER = 13;
	var KEYCODE_SPACE = 32;
	var KEYCODE_LEFT = 37;
	var KEYCODE_RIGHT = 39;

	var spaceship;

	var canvas;

	var bulletsPos    = 0;
	var bulletsLenght = 0;
	var bullets = [];

	var invaders = [];

	var sens = true; //true gauche et false droite

	var keys = {};

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
	    
	    document.onkeydown = keydown;
    	document.onkeyup = keyup;
	    createjs.Ticker.addEventListener("tick", tick);
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

	function keydown(event) {
	    keys[event.keyCode] = true;
	}

	function keyup(event) {
	    delete keys[event.keyCode];
	}

	function createBullet() {

		bullet = new createjs.Bitmap("img/bullet.png");
	    bullet.y = canvas.canvas.height - 50;
	    bullet.x = spaceship.x + spaceship.image.width/2 - 1;

		bullets[bulletsLenght] = bullet;
	    canvas.addChild(bullets[bulletsLenght]);
	    bulletsLenght++;
	}

	function tick() {

		//MOUVEMENT SPACESHIP
		if (keys[KEYCODE_SPACE]) createBullet();
	    if (keys[KEYCODE_LEFT]) spaceship.x -= 5;
	    if (keys[KEYCODE_RIGHT]) spaceship.x += 5;

		//MOUVEMENT BULLET
		for(var i=bulletsPos;i<bulletsLenght;i++) {
			if(bullets[i].y < -10) {
				canvas.removeChild(bullets[i]);
			}
			else bullets[i].y -= 5;
			for(var j=0;j<invaders.length;j++) {
				if(ndgmr.checkRectCollision(invaders[j], bullets[i])) {
					canvas.removeChild(invaders[j]);
					canvas.removeChild(bullets[i]);

					invaders[j].x = invaders[j].y = bullets[i].x = bullets[i].y = -100
				}
			}
		}

		//MOUVEMENT ENNEMIES
		var changeSens = false;
		for(var j=0;j<invaders.length;j++) {
			if(invaders[j].x != -100) {
				if(invaders[j].x < 5) {
					sens = false;
					changeSens = true;
				}
				else if(invaders[j].x > 880) {
					sens = true;
					changeSens = true;
				}	

				if(sens) invaders[j].x -= 3;
				else invaders[j].x += 3;
			}
		}

		for(var j=0;j<invaders.length;j++) {
			if(changeSens) invaders[j].y += 5;
		}

		canvas.update();
	}

	init();
</script>