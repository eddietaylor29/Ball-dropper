let balls = [];
let bumpers = [];
// let bumper;
let hitcount = 0;
let timer = 0;
let me;
let died = false;
let level = 1;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);

  //make one avatar called me
  // me = new Bucket(width/50, 34, 20 ,0);
  //draw the variable bumpers

if (level == 1){
  let bumper1 = new Bumper(100,400,0,.75,"orange");

  bumpers.push(bumper1);
  console.log(bumper1);

  let bumper2 = new Bumper(650,300,0,-.5,"blue");
  bumpers.push(bumper2);

  let bumper3 = new Bumper(400,400,0,0,"green");
  bumpers.push(bumper3);

}
  if (level == 2){


  }


}

function draw(){
	background(220);
  if (level == 1){
      bucket(200,750);
  }

  if (level ==2){
    bucket(530,750);
  }

  print(hitcount);

  // me.drawMe();
  // me.die();
  Gametimer();

   for (let i=0; i<bumpers.length; i++){
     bumpers[i].drawbumper();
   }

//	draw all the balls in that array
	for (let i = 0; i < balls.length; i++) {
	      balls[i].drawBall();
        balls[i].moveBall();
        balls[i].bounceBall();
        balls[i].score();

	  }


    if (hitcount == 1 && level==1) {
         print("Level Completed");
         died = true
         textSize(25);
         fill("green")
         noStroke();
         text('Level 1 Completed',10,47);
         text('Press Space key for next level',10,75);
       }
       if (hitcount == 2 && level==2) {
            print("Level Completed, good job!");
            died = true
            textSize(25);
            fill("blue")
            noStroke();
            text('Level 2 Completed',10,47);

          }
  }


function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
  if(keyCode=== 32 && hitcount ==1){
    level=2;
    let bumper4 = new Bumper(450,250,50,0, "purple");
    //fill("purple")
    bumpers.push(bumper4);


  }



  if (keyCode === ENTER) {
    let  b = new Ball(400, 20,2,false, false);
    balls.push(b);
  //  console.log(balls);
   }

    if (keyCode === DOWN_ARROW){
       for (let i = 0; i < balls.length; i++) {

     balls[i].falling = true;

      }
   }
}

function Gametimer() {

  noStroke();
  fill("red");
  textAlign(0, 10);
  textSize(30);
  text(timer, 650, 40);


  if (died == false){
    if (frameCount % 60 == 0 && timer >= 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer ++;
    }
  }
}

class Bumper {
	constructor(x,y, hitcount,angle,color){
		    this.x = x;
    		this.y = y;
        this.hitcount = hitcount;
        this.angle = angle
        this.color = color;
	}

  drawbumper(){
    push();
    translate(this.x, this.y)
    rotate(this.angle);
    fill(this.color)
    rect(0,0,160,40)
    pop();

  }

}


//ball class from which to create new balls with similar properties.
class Ball {

	constructor(x,y,speed,falling,scored){ //every ball needs an x value and a y value
		    this.x = x;
    		this.y = y;
       this.speed = speed;
       this.falling = falling;
       this.scored = scored;
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

  score(){
    if(level == 1){
      if(this.x>=180 && this.x<=220 && this.y > 750 && this.scored == false){
        hitcount = hitcount +1;
        this.scored = true;
       }
    }
    if (level ==2 ){
      if(this.x>=530 && this.x<=750 && this.y > 750 && this.scored == false){
        hitcount = hitcount +1;
        this.scored = true;
      }
    }






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

function bucket(x,y){

  fill("red")
  rect(x,y,40,40)

}
