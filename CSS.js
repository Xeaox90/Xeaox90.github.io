let holdId = "" //Used for mouse in and out consistency 

//Mouse In/Out functions
function pulse(event){
    holdId = event.target.id
    event.target.id = "pulse"
}
function shake(event){
    holdId = event.target.id
    event.target.id = "shake"
}
function toWhite(event){
    holdId = event.target.id
    event.target.id = "toWhite"
}
function shift(event){
    holdId = event.target.id
    event.target.id = "shift"
}
function party(event){
    document.getElementById("b1").id = "pulse"
    document.getElementById("b2").id = "shake"
    document.getElementById("b3").id = "toWhite"
    document.getElementById("b4").id = "shift"
    document.getElementById("b6").id = "warning"
    document.getElementById("warning").innerHTML = "WARNING!"
}
function partyOut(event){
    document.getElementById("pulse").id = "b1"
    document.getElementById("shake").id = "b2"
    document.getElementById("toWhite").id = "b3"
    document.getElementById("shift").id = "b4"
    document.getElementById("warning").id = "b6"
    document.getElementById("b6").innerHTML = "exit"
}
function warning(event){
    holdId = event.target.id
    event.target.innerHTML = "WARNING! WARNING!"
    event.target.id = "warning"
}
function exit(){
    let y = document.getElementById("warning")
    y.style.color = "white"
    y.style.backgroundImage = "none"
    y.style.backgroundColor = "black"
    gsap.to("#warning", {duration:2, delay:3, y:1000})
    
    let x = document.getElementsByClassName("b")
    for (i=0;i<x.length;i++){
        x[i].style.color = "white"
        x[i].style.backgroundImage = "none"
        x[i].style.backgroundColor = "black"
        gsap.to("#b"+i.toString(), {duration:2, delay:i/2, y:1000})
    }
    window.setTimeout(back,5000)
}
function back(){
    window.history.back()
}
function out(event){
    event.target.id = holdId
    if(event.target.id == "b6")
        event.target.innerHTML = "exit"
}

//Build-in Animations
let tl = gsap.timeline()
let tl2 = gsap.timeline()

//Visibility & Background glow
tl.from("html", {duration:6,backgroundColor:"black"})
tl2.to("html", {duration:3, backgroundColor:"rgb(131,55,55)"})
    .to("html", {duration:20, ease: "power1.in", backgroundColor:"rgb(180,100,59)", repeat:-1, yoyo: true})

//Div Translations
gsap.from("body", {delay:1, duration: 1, opacity: 0})
gsap.from("#b1", {delay:1, duration: 5, x:-100, y:-300})
gsap.from("#b2", {delay:1, duration: 4, x:150, y:500})
gsap.from("#b3", {delay:1, duration: 2, x: -100, y:300})
gsap.from("#b4", {delay:1, duration: 3, x: 300})
gsap.from("#b5", {delay:1, duration: 7, x: 500})
gsap.from("#b6", {delay:1, duration: 7, x: 700, y:300})