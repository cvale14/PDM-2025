let selectedColor, button1, button2, button3, button4;
let player, noise, filter, soundFX;
let cubes = [];



function preload() {
  soundFX = new Tone.Players({
    clear: "media/chalk_clear1.mp3",
    save: "media/ding_save.mp3",
    change: "media/color_change.mp3"
  }).toDestination();

  player = new Tone.Player("media/music_color.mp3").toDestination();
  player.loop = true;
}



function setup() {
  createCanvas(500, 500);
  background(255);
  selectedColor = color('white');

  let colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'];
  for (let i = 0; i < colors.length; i++) {
    cubes.push(new Cube(0, i * 25, color(colors[i])));
  }




  // Noise FX SETUP
  noise = new Tone.Noise("pink");
  filter = new Tone.Filter(100, "lowpass");
  noise.connect(filter);
  filter.toDestination();



  // Play Button
  button1 = createButton('Play');
  button1.position(460, 50);
  button1.mousePressed(() => {
    player.start();
  });



  // Stop Button
  button2 = createButton('Stop');
  button2.position(460, 125);
  button2.mousePressed(() => {
    player.stop();
  });



  // Clear Button
  button3 = createButton('Clear');
  button3.position(460, 150);
  button3.mousePressed(() => {
    clear();
    background(255);
    soundFX.player("clear").start();
    player.playbackRate = 1;
  });



  // Save Button
  button4 = createButton('Save');
  button4.position(460, 200);
  button4.mousePressed(() => {
    saveCanvas('drawing', 'png');
    soundFX.player("save").start();
  });
}



function draw() {
  fill(0);
  textSize(10);
  text('SELECTED\nCOLOR', 443, 13);

  for (let cube of cubes) {
    cube.draw();
  }

  stroke(0);
  strokeWeight(1);
  fill(selectedColor);
  square(480, 25, 15);

// line that draws while dragging
  stroke(selectedColor);
  strokeWeight(10);
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    player.playbackRate += 0.001;
  }
}



function mousePressed() {
  Tone.start();
  noise.start();
  filter.frequency.rampTo(1500, 3);

  for (let cube of cubes) {
    if (cube.contains(mouseX, mouseY)) {
      selectedColor = cube.col;
      soundFX.player("change").start();
    }
  }

  console.log("Selected color is", selectedColor.toString());
}



function mouseReleased() {
  noise.stop();
  filter.frequency.value = 100;
}



class Cube {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  draw() {
    noStroke();
    fill(this.col);
    square(this.x, this.y, 25);
  }

  contains(x, y) {
    return x >= this.x && x <= this.x + 25 &&
           y >= this.y && y <= this.y + 25;
  }
}



//clear minds and thoughts will help with debugging