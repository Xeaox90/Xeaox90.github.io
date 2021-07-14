class Game{
    //class properties
    foundCircles = 0
    totalCircles = 0
    searchColor = "#99ff00"
    normalColor = "#00ccaa"
    gameZone = document.getElementById("gameZone")
    foundBar = new FoundBar

    constructor(){
        for(var i=0;i<25;i++){
            let newCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            
            //circle properties
            newCirc.classList.add("gameCirc")
            newCirc.setAttribute("radius",15)
            //random position
            newCirc.setAttribute("cx", 50+Math.random()*500)
            newCirc.setAttribute("cy", 50+Math.random()*500)

            if(Math.random() < .3){
                newCirc.dataset.hiddenColor = this.searchColor
                this.totalCircles++
            }
            else{
                newCirc.dataset.hiddenColor = this.normalColor
            }

            newCirc.addEventListener("mouseover", (event) =>{
                event.target.style.fill = event.target.dataset.hiddenColor
            })
            newCirc.addEventListener("mouseout", (event) =>{
                event.target.style.fill = ("#000")
            })
            newCirc.addEventListener("click", (event) =>{
                if(event.target.dataset.hiddenColor == this.searchColor){
                    event.target.remove()
                    this.foundCircles++
                    this.foundBar.setPercent(this.foundCircles/this.totalCircles)
                }
            })
            
            this.gameZone.appendChild(newCirc)
        }
    }
}
class FoundBar{
    element = document.getElementById("foundBar")
    maxSize = 600
    percent = 0;

    setPercent(percent){
        this.percent = percent
        this.element.setAttribute("width", this.percent*this.maxSize)
    }
}

let g = new Game()