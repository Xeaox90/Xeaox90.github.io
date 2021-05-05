fieldX1 = 50
fieldY1 = 300
fieldX2 = 950
fieldY2 = 300
fieldX3 = 950
fieldY3 = 1100
fieldX4 = 50
fieldY4 = 1100
active = false
ready = false

class Player {
  constructor(x, y, color) {
    this.x = 500;
    this.y = 900;
    this.color = "#03e";
    this.stopped = false
  }

  draw(){
    fill(this.color)
    square(this.x-25,this.y-25,50)
  }
}

let mpc = new Player()

let tpc = []
for(i=0;i<10;i++){
  tpc[i] = new Player()
  tpc[i].x = 150 + i*55
  tpc[i].y = 850
  tpc[i].color = "#03e"
}

let npc = []
for(i=0;i<11;i++){
  npc[i] = new Player()
  npc[i].x = 150 + i*55
  npc[i].y = 800
  npc[i].color = "#fa0"
}


function setup(){
  createCanvas(1000, 1000)
  background(0)
    playerControl()
    fill("#30ee20")
    quad(fieldX1,fieldY1,fieldX2,fieldY2,fieldX3,fieldY3,fieldX4,fieldY4)
    
    setNPC()
    setTPC()
    setMPC()
    
    for(i=0;i<11;i++){
      npc[i].draw()
    }
    for(i=0;i<10;i++){
      tpc[i].draw()
    }
    mpc.draw()//square(mpc.x, mpc.y, 50)
    fill("#fff")
    textSize(50)
    text('SPACEBAR TO READY AND THEN HIKE',10,200)
    text('ARROWS TO MOVE',10,250)
    textSize(150)
}

function playerControl() {
  if (keyIsDown(LEFT_ARROW)){
    mpc.x -= 10
  }
  if (keyIsDown(RIGHT_ARROW)){
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
    
    artificialControl()
    
    for(i=0;i<11;i++){
      npc[i].draw()
    }
    for(i=0;i<10;i++){
      tpc[i].draw()
    }
    mpc.draw()//square(mpc.x, mpc.y, 50)
    checkStop()
    fill("#fff")
    textSize(50)
    text('SPACEBAR TO READY AND THEN HIKE')
    text('ARROWS TO MOVE',10,250)
    textSize(150)
  }
}

function artificialControl() { //to control all other players
  for(i=0;i<10;i++){
    for(j=0;j<11;j++){
      if(abs(tpc[i].x - npc[j].x) < 20 && abs(tpc[i].y - npc[j].y) < 20){
        tpc[i].stopped = true
        npc[j].stopped = true
      }
    }
  }
  for(i=0;i<10;i++){
    if(tpc[i].stopped == false && tpc[i].y >= 300)
      tpc[i].y -= 5
  }
  for(i=0;i<11;i++){
    if(npc[i].stopped == false){
      if(npc[i].y <= 750 && npc[i].y - mpc.y < 0)
        npc[i].y += 5
      else if(npc[i].y-mpc.y >= 0)
        npc[i].y -= 5
      if(npc[i].x - mpc.x > 0)
        npc[i].x -= 5
      else if(npc[i].x - mpc.x < 0)
        npc[i].x += 5
    }
  }
}

function changeColor(){   //uses the value element from a user input to change "team color"
  mpc.color = document.getElementById("yourJ").value
  for(i=0;i<10;i++){
      tpc[i].color = document.getElementById("yourJ").value
  }
}
function changeOpponentColor(){   //uses the value element of an input to change "opponenet color" 
  for(i=0;i<11;i++){
    npc[i].color = document.getElementById("theirJ").value
  }
}

function checkStop(){
  for(i=0;i<11;i++){
    if(abs(npc[i].x - mpc.x) < 20 && abs(npc[i].y - mpc.y) < 20){
      active = false
      mpc.stopped = true
      ready = false
      text('TACKLED',10,200)
    }
  }
  if(mpc.y <= 300){
    text('TUCHDOWN!!',10,200)
    mpc.stopped = true
    active = false
    ready = false
  }
  if(mpc.x <= 50 || mpc.x >= 950){
    mpc.stopped = true
    active = false
    ready = false
    text('OUT',10,200)
  }
}

function setNPC(){
  for(i=0;i<4;i++){
    npc[i].x = random(100,900)
    npc[i].y = 800 - int(random(0,3))*100
    npc[i].stopped = false
  }
  for(i=4;i<11;i++){
    npc[i].x = 250 + (i-4)*80
    npc[i].y = 800
    npc[i].stopped = false
  }
}

function setTPC(){
  for(i=0;i<10;i++){
    tpc[i].x = 200 + i*80
    tpc[i].y = 850
    tpc[i].stopped = false
  }
}

function setMPC(){
  mpc.x = 500
  mpc.y = 900
}

function keyPressed(){
  if(keyCode == 32 && ready == true)
    active = true
    draw()
  if(keyCode == 32){
    setup()
    ready = true
  }
}
