fieldX1 = 100
fieldY1 = 300
fieldX2 = 900
fieldY2 = 300
fieldX3 = 1100
fieldY3 = 1100
fieldX4 = -100
fieldY4 = 1100
active = true

class Player {
  constructor(x, y, color) {
    this.x = 500;
    this.y = 900;
    this.color = "#ffffff";
  }

  draw(){
    fill(this.color)
    square(this.x-25,this.y-25,50)
  }
}

let mpc = new Player()

let npc = []
for(i=0;i<11;i++){
  npc[i] = new Player()
  npc[i].x = i*50
  npc[i].y = 800
  npc[i].color = "#000"
}


function setup(){
  createCanvas(1000, 1000)
}

function playerControl() {
  if (keyIsDown(LEFT_ARROW)) {
    mpc.x -= 10
  }
  if (keyIsDown(RIGHT_ARROW)) {
    mpc.x += 10
  }
  if(keyIsDown(UP_ARROW)){
    mpc.y -= 10
  }
  if(keyIsDown(DOWN_ARROW)){
    mpc.y += 10
  }
}

function draw() {   //the field moving
  if(active){
    background(0)
    playerControl()
    fill("#30ee20")
    quad(fieldX1,fieldY1,fieldX2,fieldY2,fieldX3,fieldY3,fieldX4,fieldY4)
    for(i=0;i<11;i++){
      npc[i].draw()
    }
    mpc.draw()//square(mpc.x, mpc.y, 50)
  }
}

function artificialControl() { //to control all other players
}

function changeColor(){
  mpc.color = document.getElementById("yourJ").value
}

function changeOpponentColor(){
for(i=0;i<11;i++){
  npc[i].color = document.getElementById("theirJ").value
}
}