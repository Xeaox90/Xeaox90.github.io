function setup() {
    var glasblue = "#467c9c";
    var cloutwt = 20; //80 max
    
    createCanvas(800,600);
    background("#96b3ad")
    noStroke();
    fill(115,44,44);
    circle(400,300,200);
    
    fill(glasblue);
    stroke("white");
    strokeWeight(cloutwt);
    rect(430,220,80,80);
    rect(290,220,80,80);
    line(370, 260, 430, 260);
    line(290, 260, 200, 250);
    line(510, 260, 600, 250);
    //curve();
    //curve();
    
    fill("white");
    strokeWeight(1);
    curve(250,0, 300,350, 500,360, 800,100);
}