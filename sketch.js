let balls = [];
let bumpers = [];
// let bumper;


function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);

  //draw the variable bumpers

    let bumper1 = new Bumper(100,400,0,.75);
    bumpers.push(bumper1);
    console.log(bumper1);

    let bumper2 = new Bumper(650,300,0,-.5);
    bumpers.push(bumper2);

    let bumper3 = new Bumper(400,400,0,0)
    bumpers.push(bumper3);


}
function draw(){
	background(220);

for (let i=0; i<bumpers.length; i++){
  bumpers[i].drawbumper();
}

//	draw all the balls in that array
	for (let i = 0; i < balls.length; i++) {
	      balls[i].drawBall();
        balls[i].moveBall();
        balls[i].bounceBall();

	  }
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array

  if (keyCode === ENTER) {
    let  b = new Ball(400, 20,2,false);
    balls.push(b);
  //  console.log(balls);
   }

    if (keyCode === DOWN_ARROW){
       for (let i = 0; i < balls.length; i++) {

     balls[i].falling = true;

      }
   }
}

class Bumper {
	constructor(x,y, hitcount,angle){
		    this.x = x;
    		this.y = y;
        this.hitcount = hitcount;
        this.angle = angle
	}

  drawbumper(){
    push();
    translate(this.x, this.y)
    rotate(this.angle);
    fill("red")
    rect(0,0,160,40)
    pop();

  }

}


//ball class from which to create new balls with similar properties.
class Ball {

	constructor(x,y,speed,falling){ //every ball needs an x value and a y value
		    this.x = x;
    		this.y = y;
       this.speed = speed;
       this.falling = falling;
	}

	drawBall(){  // draw a ball on the screen at x,y
    		stroke(0);
    		fill("red");
		    ellipse(this.x,this.y,15,15);

	}

	moveBall(){ //update the location of the ball, so it moves across the screen

    if (keyIsDown(RIGHT_ARROW)&& this.falling==false) { //if you hold the up arrow, move up by speed
       this.x = this.x+10;
    }

    if (keyIsDown(LEFT_ARROW)&& this.falling==false) { // if you hold the down arrow, move down by speed
        this.x = this.x-10;
    }
    if(this.falling==true){
      this.y = this.y+this.speed;
    }
	}

  fall(){


  }

  //if the ball hits the person, change the speed value to negative (send it in the opposite direction)
    bounceBall(){
      for( let i = 0; i<bumpers.length;i++){
        if (this.x >= bumpers[i].x-80  && this.x <= bumpers[i].x+80 && this.y > bumpers[i].y-40 && this.y < bumpers[i].y+40){
            this.speed = -this.speed;
        }
      }

    }

}
