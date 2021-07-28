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
    turnIndex = 0

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
    getRoom(game){
        this.room = game.space[this.x][this.y].room
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
    let playerArray = []
    playerArray = document.getElementsByClassName("picked")
    
    //PLACES CHARACTER MARKERS AND ESTABLISHED ONCLICK TO DETERMINE WHO IS MOVING
    for(let x=0;x<playerArray.length;x++){
        
        let rand = Math.floor(Math.random()*(6-x))
        
        char[x] = new Character(startSpots[rand][0],startSpots[rand][1],playerArray[x].innerHTML)
        char[x].marker.classList.add(playerArray[x].innerHTML.replace(" ","").replace(".",""))
        startSpots.splice(rand,1)
        
        char[x].draw(suspectDeck)
        char[x].draw(weaponDeck)
        char[x].draw(roomDeck)
        
        game.space[char[x].x][char[x].y].occupied = true        
    }
    let final = new Character
    final.draw(suspectDeck)
    final.draw(weaponDeck)
    final.draw(roomDeck)
    
    clearBoard() //LEAVE UNTIL CHARACTER SELECTION IS FINISHED
    //ESTABLISH STARTING CHARACTERS
    let accusation = document.getElementById("accuse")
    accusation.onclick = function() {accuse(final,game,char)}

    game.turnIndex = Math.floor(Math.random()*char.length)

    for(let i=0;i<char.length;i++){
        if(char[i].name == "Ms. Scarlet"){
            game.curChar = char[i]
            game.turnIndex = i
            break
        }
        else{
            game.curChar = char[game.turnIndex]
        }
    }
    game.curChar.marker.classList.add("current")
    alert("It is " + game.curChar.name + "'s turn.")
    alert(game.curChar.name + " your cards are " + game.curChar.hand)
    
    
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
            || (i==7 && j>=8 && j<=10))
                game.space[i][j].room = "Library"
            if(i>=1 && i<=6 && j>=13 && j<=17)
                game.space[i][j].room = "Billiard Room"
            if(i>=10 && i<=15 && j>=1 && j<=7)
                game.space[i][j].room = "Hall"
            if((i>=9 && i<=16 && j>=18 && j<=23)
            || (i>=11 && i<=14 && j>=24 && j<=25))
                game.space[i][j].room = "Ballroom"
            if((i>=17 && i<=24 && j>=10 && j<=15)
            || (i>=20 && i<=24 && j==16))
                game.space[i][j].room = "Dining Room"

            if(i>=1 && i<=7 && j>=1 && j<=4){
                game.space[i][j].room = "Study"
                game.space[i][j].portal = true
            }
            if(i>=18 && i<=24 && j>=1 && j<=6){
                game.space[i][j].room = "Lounge"
                game.space[i][j].portal = true
            }
            if((i>=1 && i<=5 && j>=20 && j<=24)
            || (i==6 && j>=21 && j<=24)){
                game.space[i][j].room = "Conservatory"
                game.space[i][j].portal = true
            }
            if(i>=19 && i<=24 && j>=19 && j<=24){
                game.space[i][j].room = "Kitchen"
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
    let rolled = false
    document.getElementById("rollClick").addEventListener("click", function(){
        if(!rolled){moves = dice.roll();this.innerHTML=moves;pathIndex = [];rolled = true}})

    

    let pathIndex = []                    
    document.addEventListener("keydown",function(event){
        event.preventDefault()
        
        //CLEARS THE MARKED DOTTED PATHS          !!!!!! THIS SHOULD ALSO DETERMINE GAME STATE AFTER FINISHING MOVE!!!!!!
        if(event.key == 'Enter'){
            let pathArray = document.getElementsByClassName("path")
            let y = pathArray.length //static iterations
            for(let i=0;i<y;i++){
                pathArray[0].classList.remove("path")//act on available element from a shrinking array
            }
            
            let c = game.curChar
            if(game.space[c.x][c.y].room){
                c.getRoom(game)

                game.curChar.marker.classList.remove("current")

                guessBoard(c,char,game)
                moves = -1
                rolled = false
            }
            else{
                game.curChar.marker.classList.remove("current")
                if(game.turnIndex == char.length-1)
                    game.turnIndex = 0
                else
                    game.turnIndex++
                game.curChar = char[game.turnIndex]
                console.log(game.turnIndex)
                moves = -1
                rolled = 
                game.curChar.marker.classList.add("current")
                alert("It is " + game.curChar.name + "'s turn.")
                alert(game.curChar.name + " your cards are " + game.curChar.hand)
            }
        }

            //EVENT LISTENER: CHARACTER MOVEMENT ON KEYDOWN
        let c = game.curChar
        if(moves >= 0){
            game.space[c.x][c.y].occupied = false

            //UGGHHHH I SHOULD HAVE MADE THIS A FUNCTION... MAYBE
            if(event.key == 'ArrowLeft' && game.space[c.x-1][c.y].occupied == false
            && !(game.space[c.x-1][c.y].room && game.space[c.x][c.y].door == false)
            && !(game.space[c.x-1][c.y].door == false && game.space[c.x][c.y].room)){
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
            !(game.space[c.x+1][c.y].room && game.space[c.x][c.y].door == false)
            && !(game.space[c.x+1][c.y].door == false && game.space[c.x][c.y].room)){
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
            !(game.space[c.x][c.y-1].room && game.space[c.x][c.y].door == false)
            && !(game.space[c.x][c.y-1].door == false && game.space[c.x][c.y].room)){
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
            !(game.space[c.x][c.y+1].room && game.space[c.x][c.y].door == false)
            && !(game.space[c.x][c.y+1].door == false && game.space[c.x][c.y].room)){
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

//ON-CLICK DISPLAYS CHARACTER OPTIONIS
function characterDisplay(){
    list = document.getElementById("characterList")
    list.innerHTML = ""
    for(i=0;i<suspectList.length;i++){
        let x = document.createElement("li")
        x.innerHTML = suspectList[i]
        x.classList.add(x.innerHTML.replace(" ","").replace(".",""))
        list.appendChild(x)
        x.onclick = function(){if(this.classList.contains("picked")){this.classList.remove("picked")}else{this.classList.add("picked")}}
    }
}

function clearBoard(){
    document.getElementById('userInterface').remove()
}

function guessBoard(c,char,game){
    let interface = document.createElement('div')
    interface.id = "userInterface"
    interface.innerHTML = "Make your Guess!"
    
    let y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)
    for(let i=0;i<suspectList.length;i++){
        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = suspectList[i].replace(" ","").replace(".","")
        l.innerHTML = suspectList[i]
        x.type = "radio"
        x.checked = false
        x.id = suspectList[i].replace(" ","").replace(".","")
        x.value = suspectList[i].replace(" ","").replace(".","")
        x.name = "suspect"
        y.appendChild(x)
        y.appendChild(l)
    }
    y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)
    for(let i=0;i<weaponList.length;i++){
        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = weaponList[i].replace(" ","").replace(".","")
        l.innerHTML = weaponList[i]
        x.type = "radio"
        x.checked = false
        x.id = weaponList[i].replace(" ","").replace(".","")
        x.value = weaponList[i].replace(" ","").replace(".","")
        x.name = "weapon"
        y.appendChild(x)
        y.appendChild(l)
    }
    y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)

        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = c.room.replace(" ","").replace(".","")
        l.innerHTML = c.room
        x.type = "radio"
        x.checked = false
        x.id = c.room.replace(" ","").replace(".","")
        x.value = c.room.replace(" ","").replace(".","")
        x.name = "room"
        y.appendChild(x)
        y.appendChild(l)

    
    let button = document.createElement("button")
    button.innerHTML = "Submit Guess"
    
    button.onclick = function() {let checkList = check(interface);
        let matchList = []
        for(let i=0;i<char.length;i++){
            for(let j=0;j<char[i].hand.length;j++){
                for(let k=0;k<checkList.length;k++){
                    if(checkList[k] == char[i].hand[j].replace(" ","").replace(".",""))
                        matchList.push([char[i].name,char[i].hand[j]])
                }
            }
        }
        let rand = Math.floor(Math.random()*matchList.length)
        alert(c.name)
        if(matchList.length != 0)
            alert(matchList[rand][0] + " reveals the " + matchList[rand][1] + " card.")
        else
            alert("No cards to reaveal, but don't forget there are some in the deck.")
        interface.remove()
        if(game.turnIndex == char.length-1)
            game.turnIndex = 0
        else
            game.turnIndex++
        game.curChar = char[game.turnIndex]
        game.curChar.marker.classList.add("current")
        alert("It is " + game.curChar.name + "'s turn.")
        alert(game.curChar.name + " your cards are " + game.curChar.hand)
    }
    document.body.appendChild(interface)
    interface.appendChild(button)
}

function check(interface){
    let x = []
    let y = []
    x = interface.getElementsByTagName("input")
    for(let i=0;i<x.length;i++){
        if(x[i].checked)
            y.push(x[i].value)
    }
    console.log(y)
    return(y)
}

function accuse(final,game,char){
    let interface = document.createElement('div')
    interface.id = "userInterface"
    interface.innerHTML = "Make your Accusation!"
    
    let y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)
    for(let i=0;i<suspectList.length;i++){
        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = suspectList[i].replace(" ","").replace(".","")
        l.innerHTML = suspectList[i]
        x.type = "radio"
        x.checked = false
        x.id = suspectList[i].replace(" ","").replace(".","")
        x.value = suspectList[i].replace(" ","").replace(".","")
        x.name = "suspect"
        y.appendChild(x)
        y.appendChild(l)
    }
    y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)
    for(let i=0;i<weaponList.length;i++){
        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = weaponList[i].replace(" ","").replace(".","")
        l.innerHTML = weaponList[i]
        x.type = "radio"
        x.checked = false
        x.id = weaponList[i].replace(" ","").replace(".","")
        x.value = weaponList[i].replace(" ","").replace(".","")
        x.name = "weapon"
        y.appendChild(x)
        y.appendChild(l)
    }
    y = document.createElement("ul")
    y.classList.add("guess")
    interface.appendChild(y)
    for(let i=0;i<roomList.length;i++){
        let x = document.createElement('input')
        let l = document.createElement('label')
        l.for = roomList[i].replace(" ","").replace(".","")
        l.innerHTML = roomList[i]
        x.type = "radio"
        x.checked = false
        x.id = roomList[i].replace(" ","").replace(".","")
        x.value = roomList[i].replace(" ","").replace(".","")
        x.name = "room"
        y.appendChild(x)
        y.appendChild(l)
    }

    
    let button = document.createElement("button")
    button.innerHTML = "Submit Accusation"
    
    button.onclick = function() {let checkList = check(interface);   
        let matchList = []
        for(let j=0;j<final.hand.length;j++){
                for(let k=0;k<checkList.length;k++){
                    if(checkList[k] == final.hand[j].replace(" ","").replace(".",""))
                        matchList.push(final.hand[j])
                }
            }
        alert(game.curChar.name)
        if(matchList.length == 3){
            alert("You Win! Congratulations!")
            window.setTimeout(location.reload,5000)
        }
        else{
            alert("Sorry " + game.curChar.name + ", that is incorrect.")
            alert("Goodbye")
            for(let i=0;i<char.length;i++){
                if (char[i] == game.curChar){
                    game.curChar.marker.remove()
                    char.splice(i,1)
                }
            }
            game.turnIndex--
        }
        interface.remove()
        
        if(game.turnIndex == char.length-1)
            game.turnIndex = 0
        else
            game.turnIndex++
        game.curChar = char[game.turnIndex]
        game.curChar.marker.classList.add("current")
        alert("It is " + game.curChar.name + "'s turn.")
        alert(game.curChar.name + " your cards are " + game.curChar.hand)
    }
    document.body.appendChild(interface)
    interface.appendChild(button)
}
