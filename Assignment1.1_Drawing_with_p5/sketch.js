function setup() {
  createCanvas(600, 600);
  colorMode(HSB,360,100,100);
  angleMode(DEGREES);
}

function draw() {
  background('white');
  noStroke();
  fill(100,100,100)
  rect(0,0,200,100)
  
  stroke('black')
  strokeWeight(1)
  fill('white')
  circle(50,50,80)
  square(110,10,80)
 
  noStroke()
  fill(0,100,100,.35)
  circle(450,105,150)
  fill(120,100,100,.35)
  circle(495,195,150)
  fill(240,100,100,.35)
  circle(405,195,150)
  
  fill('black')
  rect(0,400,203,103)
  fill(60,70,100)
  arc(50,450,85,85,225,135)
  fill(0,75,100)
  arc(150,450,85,85,180,0)
  rect(107.5,450,85,42.5)
  fill('white')
  circle(130,450,25)
  circle(170,450,25)
  fill(240,80,100)
  circle(130,450,15)
  circle(170,450,15)

  fill(240,100,55)
  square(340,340,230)
  stroke('white')
  strokeWeight(3.5)
  fill(120,100,50)
  circle(455,455,103)
  fill('red')
  beginShape();
    vertex(405,440);
    vertex(443,440);
    vertex(455,405);
    vertex(467,440);
    vertex(505,440);
    vertex(475,463);
    vertex(485,497);
    vertex(455,480);
    vertex(425,497);
    vertex(435,463);
    
    
    vertex()
  endShape(CLOSE)
}
