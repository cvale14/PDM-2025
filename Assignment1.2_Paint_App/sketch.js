
let cube;
let cube2;
let cube3;
let selectedColor;

function setup() {
  createCanvas(500, 500);
  selectedColor = color('white');
  cube = new Cube (0,0,color('red'));
  cube2 = new Cube (0,25,color('orange'));
  cube3 = new Cube (0,50,color('yellow'));
  cube4 = new Cube (0,75,color('green'));
  cube5 = new Cube (0,100,color('cyan'));
  cube6 = new Cube (0,125,color('blue'));
  cube7 = new Cube (0,150,color('magenta'));
  cube8 = new Cube (0,175,color('brown'));
  cube9 = new Cube (0,200,color('white'))
  cube10 = new Cube (0,225,color('black'));
}

function draw() {
  //background(255);

  cube.draw();
  cube2.draw ();
  cube3.draw();
  cube4.draw();
  cube5.draw();
  cube6.draw();
  cube7.draw();
  cube8.draw();
  cube9.draw();
  cube10.draw();

  stroke(0);
  strokeWeight(1);
  fill(selectedColor);
  circle(475,25,15);

  stroke(selectedColor);
  strokeWeight(10);
  if (mouseIsPressed === true) {
    line (mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed () {
  if (cube.contains(mouseX,mouseY)) {
    selectedColor = cube.fill;
  } else if (cube2.contains(mouseX,mouseY)) {
    selectedColor = cube2.fill;
  } else if (cube3.contains(mouseX,mouseY)) {
    selectedColor = cube3.fill;
  } else if (cube4.contains(mouseX,mouseY)) {
    selectedColor = cube4.fill;
  } else if (cube5.contains(mouseX,mouseY)) {
    selectedColor = cube5.fill;
  } else if (cube6.contains(mouseX,mouseY)) {
    selectedColor = cube6.fill;
  } else if (cube7.contains(mouseX,mouseY)) {
    selectedColor = cube7.fill;
  } else if (cube8.contains(mouseX,mouseY)) {
    selectedColor = cube8.fill;
  } else if (cube9.contains(mouseX,mouseY)) {
    selectedColor = cube9.fill;
  } else if (cube10.contains(mouseX,mouseY)) {
    selectedColor = cube10.fill;
  }
  console.log("selected color is " + selectedColor);
}

class Cube {
  constructor (x,y,fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
  draw() {
      noStroke();
      fill(this.fill);
      square(this.x,this.y,25);
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+25;
    let insideY = y >= this.y && y <= this.y+25;
    return insideX && insideY;
  }
}
