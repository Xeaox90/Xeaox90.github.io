/*import * as Clue from "./clueJava.js"

Clue.run(3) THIS IS PETTY BS*/

//import { run } from "./clueJava"

class Dice{//only one find 3d elements in svg
    visible = false
    total = 0
    
    roll(number = 1,type = 6){
        this.total = 0
        for(let i=0;i<number;i++){
            this.total += Math.floor(Math.random()*type+1)
        }
        return this.total
    }
}

suspectList = ["Mrs. Peacock", "Col. Mustard", "Rev. Green", "Prof. Plum", "Ms. Scarlet", "Mrs. White"]
weaponList = ["Revolver", "Dagger", "Lead Pipe", "Rope", "Candlestick", "Wrench"]
roomList = ["Billiard Room", "Study", "Hall", "Lounge", "Dining Room", "Ballroom", "Conservatory", "Library", "Kitchen"]

class Card{
    constructor(name){
        this.name = name
    }
    
    //interacts with character.draw()
    draw(){

    }

    show(){}
}


//contains the playstate and the image and ?rooms?events?
class Space{
    occupied = false
    room = false
    portal = false
    door = false

    constructor(x,y){
        this.tile = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        this.tile.classList.add("space")
        this.tile.setAttribute("x", 37 +(x)*53.6)
        this.tile.setAttribute("y", 31 +(y)*51.75)
        let board = document.getElementById("gameBoard")
        board.appendChild(this.tile)
    }
}


class Board{
    space = []
    curChar = ""

    constructor(x,y){
        for(var i=0;i<x;i++){
            this.space[i] = []
            for(var j=0;j<y;j++){
                this.space[i][j] = new Space(i,j)
            }
        }
    }

    currentChar(char){
        this.curChar = char
    }
}

class Character{
    hand = []

    constructor(x,y,name = "Player"){
        this.x = x
        this.y = y
        this.name = name
        this.marker = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        this.marker.classList.add("player")
        this.marker.setAttribute("cx", 52 +this.x*53.6)
        this.marker.setAttribute("cy", 46 +this.y*51.75)
        let board = document.getElementById("gameBoard")
        board.appendChild(this.marker)    
    }
    
    move(key){
        let x = this.marker.cx.baseVal.value
        let y = this.marker.cy.baseVal.value
        switch(key){
            case "ArrowLeft":
                this.marker.setAttribute("cx", x - 53.6)
                this.x--
                break
            case "ArrowRight":
                this.marker.setAttribute("cx", x + 53.6)
                this.x++
                break
            case "ArrowUp":
                this.marker.setAttribute("cy", y - 51.75)
                this.y--
                break
            case "ArrowDown":
                this.marker.setAttribute("cy", y + 51.75)
                this.y++
                break
        }
    }
    
    draw(cType,num = 1){
        let rand = Math.floor(Math.random() * cType.length)
        this.hand.push(cType[rand])
        cType.splice(rand,1)
        console.log(cType)
    }

    setChar(game){
        game.currentChar(this)
    }
}

                //MAIN DEPENDANT PROGRAM
function runClue(){
    
    let game = new Board(25,26)
    let dice = new Dice

    let suspectDeck = []
    let weaponDeck = []
    let roomDeck = []
    for(let i=0;i<suspectList.length;i++)
        suspectDeck[i] = suspectList[i]
    for(let i=0;i<weaponList.length;i++)
        weaponDeck[i] = weaponList[i]
    for(let i=0;i<roomList.length;i++)
        roomDeck[i] = roomList[i]
    
    
    let char = []
    let moves = -1

    let startSpots = [[1,6],[17,1],[24,8],[1,19],[10,25],[15,25]]
    //PLACES CHARACTER MARKERS AND ESTABLISHED ONCLICK TO DETERMINE WHO IS MOVING
    for(let x=0;x<suspectList.length;x++){ //MAYBE WITH NO LET THAT'S WHY THIS WAS A SUNUFAGUN -- YEP THAT'S WHAT IT WAS
        let rand = Math.floor(Math.random()*(6-x))
        char[x] = new Character(startSpots[rand][0],startSpots[rand][1],suspectList[x])
        char[x].marker.classList.add(suspectList[x].replace(" ","").replace(".",""))
        startSpots.splice(rand,1)
        
        char[x].draw(suspectDeck)
        char[x].draw(weaponDeck)
        char[x].draw(roomDeck)
        
        game.space[char[x].x][char[x].y].occupied = true
        
        //ONCLICK FUNCTION THIS THING WAS A SON OF A GUN
        char[x].marker.onclick = function(){
            game.curChar = char[x]
            console.log(char[x])
            let selectorArray = document.getElementsByClassName("current")
            if(selectorArray.length == 0)
                char[x].marker.classList.add("current")
            else{
                selectorArray[0].classList.remove("current")
                char[x].marker.classList.add("current")
            }
        }
    }
    
    //MANUALLY AND PROCEDURALLY IDENTIFY SPECIAL BOARD SPACES
    {game.space[7][5].door = true
    game.space[9][5].door = true
    game.space[18][7].door = true
    game.space[12][8].door = true
    game.space[13][8].door = true
    game.space[8][9].door = true
    game.space[18][9].door = true
    game.space[2][12].door = true
    game.space[4][12].door = true
    game.space[16][13].door = true
    game.space[7][16].door = true
    game.space[10][17].door = true
    game.space[15][17].door = true
    game.space[20][18].door = true
    game.space[6][20].door = true
    game.space[8][20].door = true
    game.space[17][20].door = true}
    for(i=0;i<25;i++){
        for(j=0;j<26;j++){
            if((i>=1 && i<=6 && j>=7 && j<=11)
            || (i==7 && j>=8 && j<=10)
            || (i>=1 && i<=6 && j>=13 && j<=17)
            || (i>=1 && i<=6 && j>=7 && j<=11)
            || (i>=10 && i<=15 && j>=1 && j<=7)
            || (i>=9 && i<=16 && j>=18 && j<=23)
            || (i>=11 && i<=14 && j>=24 && j<=25)
            || (i>=17 && i<=24 && j>=10 && j<=15)
            || (i>=20 && i<=24 && j==16)){
                game.space[i][j].room = true
            }
            if((i>=1 && i<=7 && j>=1 && j<=4)
            || (i>=18 && i<=24 && j>=1 && j<=6)
            || (i>=1 && i<=5 && j>=20 && j<=24)
            || (i==6 && j>=21 && j<=24)
            || (i>=19 && i<=24 && j>=19 && j<=24)){
                game.space[i][j].room = true
                game.space[i][j].portal = true
            }
            if((i>=10 && i<= 14 && j>=9 && j<=15)
            || (i==0 && j<=24)
            || (i<=25 && j==1)){
                game.space[i][j].occupied = true
            }

        }
    }
    

    


    //ROLLS DICE FROM HTML BUTTON TO RESTRICT MOVEMENT BELOW
    document.getElementById("rollClick").addEventListener("click", function(){moves = dice.roll();this.innerHTML=moves;pathIndex=[]})

    

    let pathIndex = []                    
    document.addEventListener("keydown",function(event){        
        /*if(event.key ==' '){VESTIGIAL ROLL LISTENER
            event.preventDefault()
            moves = dice.roll()
            console.log(moves)
            pathIndex = []
        }*/
        
        //CLEARS THE MARKED DOTTED PATHS          !!!!!! THIS SHOULD ALSO DETERMINE GAME STATE AFTER FINISHING MOVE!!!!!!
        if(event.key == 'Enter'){
            let pathArray = document.getElementsByClassName("path")
            let y = pathArray.length //static iterations
            for(let i=0;i<y;i++){
                pathArray[0].classList.remove("path")//act on available element from a shrinking array
            }
            game.curChar.marker.classList.remove("current")
            game.currentChar("")
        }

            //EVENT LISTENER: CHARACTER MOVEMENT ON KEYDOWN
        c = game.curChar
        if(moves >= 0){
            game.space[c.x][c.y].occupied = false
            
            //UGGHHHH I SHOULD HAVE MADE THIS A FUNCTION... MAYBE
            if(event.key == 'ArrowLeft' && game.space[c.x-1][c.y].occupied == false
            && !(game.space[c.x-1][c.y].room == true && game.space[c.x][c.y].door == false)
            && !(game.space[c.x-1][c.y].door == false && game.space[c.x][c.y].room == true)){
                game.space[c.x][c.y].tile.classList.add("path")
                if(pathIndex.length == 0){
                    console.log(pathIndex)
                    moves--
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    pathIndex.push([x,y])
                    c.move("ArrowLeft")
                }
                else{
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    c.move("ArrowLeft")
                    if(c.x == pathIndex[pathIndex.length-1][0] && c.y == pathIndex[pathIndex.length-1][1]) {
                        console.log("left")
                        moves++
                        game.space[x][y].tile.classList.remove("path")
                        pathIndex.pop()
                    }
                    else{
                        console.log(pathIndex)
                        moves--
                        pathIndex.push([x,y])
                        if(moves < 0){
                            moves++
                            game.space[x][y].tile.classList.remove("path")
                            pathIndex.pop()
                            c.move("ArrowRight")
                        }
                    }
                }
            }
            if(event.key == 'ArrowRight' && game.space[c.x+1][c.y].occupied == false &&
            !(game.space[c.x+1][c.y].room == true && game.space[c.x][c.y].door == false)
            && !(game.space[c.x+1][c.y].door == false && game.space[c.x][c.y].room == true)){
                game.space[c.x][c.y].tile.classList.add("path")
                if(pathIndex.length == 0){
                    console.log(pathIndex)
                    moves--
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    pathIndex.push([x,y])
                    c.move("ArrowRight")

                }
                else{
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    c.move("ArrowRight")
                    if(c.x == pathIndex[pathIndex.length-1][0] && c.y == pathIndex[pathIndex.length-1][1]) {
                        console.log("right")
                        moves++
                        game.space[x][y].tile.classList.remove("path")
                        pathIndex.pop()
                    }
                    else{
                        console.log(pathIndex)
                        moves--
                        pathIndex.push([x,y])
                        if(moves < 0){
                            moves++
                            game.space[x][y].tile.classList.remove("path")
                            pathIndex.pop()
                            c.move("ArrowLeft")
                        }
                    }
                }
            }
            if(event.key == 'ArrowUp' && game.space[c.x][c.y-1].occupied == false &&
            !(game.space[c.x][c.y-1].room == true && game.space[c.x][c.y].door == false)
            && !(game.space[c.x][c.y-1].door == false && game.space[c.x][c.y].room == true)){
                game.space[c.x][c.y].tile.classList.add("path")
                if(pathIndex.length == 0){
                    console.log(pathIndex)
                    moves--
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    pathIndex.push([x,y])
                    c.move("ArrowUp")
                }
                else{
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    c.move("ArrowUp")
                    if(c.x == pathIndex[pathIndex.length-1][0] && c.y == pathIndex[pathIndex.length-1][1]) {
                        console.log("up")
                        moves++
                        game.space[x][y].tile.classList.remove("path")
                        pathIndex.pop()
                    }
                    else{
                        console.log(pathIndex)
                        moves--
                        pathIndex.push([x,y])
                        if(moves < 0){
                            moves++
                            game.space[x][y].tile.classList.remove("path")
                            pathIndex.pop()
                            c.move("ArrowDown")
                        }
                    }
                }
            }
            if(event.key == 'ArrowDown' && game.space[c.x][c.y+1].occupied == false &&
            !(game.space[c.x][c.y+1].room == true && game.space[c.x][c.y].door == false)
            && !(game.space[c.x][c.y+1].door == false && game.space[c.x][c.y].room == true)){
                game.space[c.x][c.y].tile.classList.add("path")
                if(pathIndex.length == 0){
                    console.log(pathIndex)
                    moves--
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    pathIndex.push([x,y])
                    c.move("ArrowDown")

                }
                else{
                    let x = c.x.valueOf()
                    let y = c.y.valueOf()
                    c.move("ArrowDown")
                    if(c.x == pathIndex[pathIndex.length-1][0] && c.y == pathIndex[pathIndex.length-1][1]) {
                        console.log("down")
                        moves++
                        game.space[x][y].tile.classList.remove("path")
                        pathIndex.pop()
                    }
                    else{
                        console.log(pathIndex)
                        moves--
                        pathIndex.push([x,y])
                        if(moves < 0){
                            moves++
                            game.space[x][y].tile.classList.remove("path")
                            pathIndex.pop()
                            c.move("ArrowUp")
                        }
                    }
                }
            }
            game.space[c.x][c.y].occupied = true
        }
    })
}

//RESIZES INPUT AREA TO FIT PLACEHOLDER
function characterSelector(){
    input = document.getElementById("characterSelector")
    input.setAttribute('size', input.getAttribute('placeholder').length)    
}
//ON-CLICK DISPLAYS CHARACTER OPTIONIS
function characterDisplay(){
    list = document.getElementById("characterList")
    list.innerHTML = ""
    for(i=0;i<suspectList.length;i++){
        let x = document.createElement("li")
        x.innerHTML = suspectList[i]
        x.setAttribute("class", "li "+i)
        list.appendChild(x)
    }
}
//THIS IS UPDATING TOO QUICKLY (THE X.LENGTH CHANGES WHEN IT IS DELETING <LI> ELEMENTS)
function characterUpdate(){
    characterDisplay()
    let list = document.getElementById("characterList")
    let delArray = []
    let y = document.getElementById("characterSelector").value
    let x = document.getElementsByClassName("li")
    for(j=0;j<x.length;j++){
        if(x[j].innerHTML.toLowerCase().includes(y.toLowerCase())){
            
            console.log(x[j].innerHTML,"match",j)
        }
        else{
            delArray.push(x[j.innerHTML])
        }
    }
}