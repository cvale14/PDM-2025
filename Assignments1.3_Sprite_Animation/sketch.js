// VARIABLES
let cyclops, ninja, spelunky;
let cyclopsCharacter, ninjaCharacter, spelunkyCharacter;

function preload() { // will allow everything to load properly
  cyclops = loadImage("media/cyclops.png");
  ninja = loadImage("media/ninja.png");
  spelunky = loadImage("media/spelunky.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  

  
//cyclops
  cyclopsCharacter = new Character(random(80, width-80),random(80, height-80));
  cyclopsCharacter.addAnimation("down", new SpriteAnimation(cyclops, 6, 5, 6));
  cyclopsCharacter.addAnimation("up", new SpriteAnimation(cyclops, 0, 5, 6));
  cyclopsCharacter.addAnimation("left", new SpriteAnimation(cyclops, 0, 0, 8));
  cyclopsCharacter.addAnimation("right", new SpriteAnimation(cyclops, 0, 0, 8));
  cyclopsCharacter.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  cyclopsCharacter.currentAnimation = "stand";

  // ninja
  ninjaCharacter = new Character(random(80, width-80),random(80, height-80));
  ninjaCharacter.addAnimation("down", new SpriteAnimation(ninja, 6, 5, 6));
  ninjaCharacter.addAnimation("up", new SpriteAnimation(ninja, 0, 5, 6));
  ninjaCharacter.addAnimation("stand", new SpriteAnimation(ninja, 0, 0, 1));
  ninjaCharacter.addAnimation("left", new SpriteAnimation(ninja, 0, 0, 8));
  ninjaCharacter.addAnimation("right", new SpriteAnimation(ninja, 0, 0, 8));
  ninjaCharacter.currentAnimation = "stand";

  //spelunky
  spelunkyCharacter = new Character(random(80, width-80),random(80, height-80));
  spelunkyCharacter.addAnimation("down", new SpriteAnimation(spelunky, 6, 5, 6));
  spelunkyCharacter.addAnimation("up", new SpriteAnimation(spelunky, 0, 5, 6));
  spelunkyCharacter.addAnimation("left", new SpriteAnimation(spelunky, 0, 0, 8));
  spelunkyCharacter.addAnimation("right", new SpriteAnimation(spelunky, 0, 0, 8));
  spelunkyCharacter.addAnimation("stand", new SpriteAnimation(spelunky, 0, 0, 1));
  spelunkyCharacter.currentAnimation = "stand";

  
}

function keyPressed() {

  cyclopsCharacter.keyPressed();
  ninjaCharacter.keyPressed();
  spelunkyCharacter.keyPressed();
}

function keyReleased() {
 
  cyclopsCharacter.keyReleased();
  ninjaCharacter.keyReleased();
  spelunkyCharacter.keyReleased();
}

class Character {
  constructor(x, y) { // allows me to decide where in the canvas I can draw my characters
    this.x = x;
    this.y = y;
    this.currentAnimation = null; 
    this.animations = {};
    this.flipped = false; // FLIP STUFF
  }

  draw() {
   
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2; 
          break;
        case "down":
          this.y += 2; 
          break;
        case "left":
          this.x -=2; 
          this.flipped = true;
          break;
        case "right":
          this.x +=2;
          this.flipped = false;
          break;
      
      }
      push(); 
      translate(this.x, this.y);
      animation.draw(this.flipped); 
      pop();
    }
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  keyPressed() { 
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left"; 
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
    }
  }

  keyReleased() { 
    this.currentAnimation = "stand"; 
    
  }
}

function draw() {
  background(220);

  // Draw all characters on the canvas
  cyclopsCharacter.draw();
  ninjaCharacter.draw();
  spelunkyCharacter.draw();
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet; 
    this.u = startU;                 
    this.v = startV;                 
    this.duration = duration;        
    this.startU = startU;            
    this.frameCount = 0;             
  }

  // Now we accept 'flipped' as an argument in the draw function
  draw(flipped) {
    let s = flipped ? -1 : 1;  // Flip the sprite horizontally if 'flipped' is true, else no flip
    scale(s, 1);                // Flip the sprite along the x-axis if needed
    
    // Draw the current frame of the sprite animation
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);
    
    // Increment the frame counter every 10 frames
    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;  // Move to the next frame
    }

    
    if (this.u === this.startU + this.duration) {
      this.u = this.startU;  
    }
    
    scale(1, 1);  // Reset the scale after drawing (important to avoid affecting other objects)
  }
}
