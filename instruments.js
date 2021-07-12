class Instrument{
    constructor(loudness,family,verb){
        this.loudness = loudness
        this.family = family
        this.verb = verb
    }
    
    play(){
        console.log("The " + this.family + " " + this.verb + " at " + this.loudness + " levels.")
    }
}

class Woodwinds extends Instrument{
    constructor(loudness){
        super(loudness,"Woodwinds","lilt")
    }
}

class Percussion extends Instrument{
    constructor(loudness){
        super(loudness,"Percussion","thrum")
    }
}

class Strings extends Instrument{
    constructor(loudness){
        super(loudness,"Strings","sing")
    }
}

let instruments = []
instruments[0] = new Woodwinds("really loud")
instruments[1] = new Percussion("really loud")
instruments[2] = new Strings("really quiet")

function setup(){
    for(i=0;i<instruments.length;i++){
        instruments[i].play()
    }
}