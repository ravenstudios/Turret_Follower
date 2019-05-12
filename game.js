var gameWidth = 600;
var gameHeight = 400;


var tank;

function setup(){
	createCanvas(gameWidth, gameHeight);
	tank = new Tank(gameWidth / 2, gameHeight / 2);//middle of screen
}


function update(){

	tank.update();
}


function draw(){
	angleMode(DEGREES);
	background(100);
	tank.draw();

	update();
}

class Tank{

	constructor(x, y){
		this.x = x;
		this.y = y;
		this.size = 32;
		this.angle = 0;
		this.xSpeed = 3;
		this.ySpeed = 3;
	}

	update(){
		this.bounds();//makes it bounce off the walls
		this.move();//moves the tank
		this.track(mouseX, mouseY);//pass in x and y of target to track
	}

	draw(){
		push();
		translate(this.x, this.y);
		rotate(this.angle + 90); //not sure why its off by 90° but adding it makes it aim right
		fill(0);
		rect(0, 0, this.size, this.size);//body of tank
		fill(0, 255, 0);
		rect(this.size / 4, -this.size, this.size / 2, this.size);//turrett
		pop();
	}

	move(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}


	bounds(){
		if(this.x  < 0){
			this.xSpeed = - this.xSpeed;//left side of screen
		}
		if(this.x + this.size > gameWidth){
			this.xSpeed = - this.xSpeed;//right side of screen
		}
		if(this.y  < 0){
			this.ySpeed = - this.ySpeed;//top of screen
		}
		if(this.y + this.size > gameHeight){
			this.ySpeed = - this.ySpeed;//bottom of screen
		}
	}

/*
	This function tracks what ever target you give it by passing in
	the x and y of the target. You could passe in mouseX, mouseY or the
	x and y of another object
*/

	track(x, y){
		var tx = x;//tracking x
		var ty = y;//tracking y

		/* this function I didnt write and dont fully understand but
			after playing with it i got it to work
		*/
		this.angle = angle360(this.x, this.y, tx, ty);

		strokeWeight(3);//line width
		stroke(255, 0, 0);//red line color
		line(this.x + this.size, this.y, tx, ty);//draws a red line to show tracking
		strokeWeight(1);//returns line size back to 1
		stroke(0);//black line color
	}

}

/*
	all code below was copied from
	https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
	no idea how it works but it does.
	i used cx = tank.x, cy = tank.y, ex = target.x, ey = target.y
*/
function angle(cx, cy, ex, ey) {
var dy = ey - cy;
var dx = ex - cx;
var theta = Math.atan2(dy, dx); // range (-PI, PI]
theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
return theta;
}

function angle360(cx, cy, ex, ey) {
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
