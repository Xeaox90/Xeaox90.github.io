class Raindrop {
    constructor(){
        this.depth = 4 + Math.random()*50
        this.xPos = Math.random()*800
        this.yPos = -100 + Math.random()*100
        this.speed = 1
    }
    draw(){
        circle(this.xPos,this.yPos,this.depth/10)
    }
    update(){
        this.speed = 50 + Math.abs(this.yPos *.1)
        this.yPos = this.yPos + this.speed
    }
}

class RainHandler {
    constructor(amount){
        this.amount = 10
    }
    add(x){   
        this.amount = this.amount + x
    }
    draw(){
        noStroke()
        fill(0,0,12.775*this.amount/10)
        rect(0,600-this.amount/5,800,200+this.amount/5)
    }
}

let rain = [new Raindrop()]
let puddle = new RainHandler()
let i = 0

function setup(){
    createCanvas(800,800)
}

function draw(){
    background("#777770")
    puddle.draw()
    let x=Math.random()*100

    if(x>22){
        rain.push(new Raindrop())
    }

    fill("#aaaaff")

    for (j=i;j<rain.length;j++){
        rain[j].draw()
        rain[j].update()
        if(rain[j].yPos >= 800 - 400/rain[j].depth){
            rain.shift()
            puddle.add(1)
        }

    }
}