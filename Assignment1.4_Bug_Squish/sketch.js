let redbugs = [];
let RedbugSpeed = 1;
let speedInc = 0.2;
let respawnDelay = 2;
let timeRemaining = 30;
let score = 0;
let gameState = 'start';
let gameFont;

function preload(){
  // ✅ FIXED: Correct font path
  gameFont = loadFont('media/CalSans-Regular.ttf');

  // Redbug images are handled by the Redbug constructor
  for (let i = 0; i < 10; i++) {
    spawnRedbug();
  }
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background('blue');

  textAlign(CENTER);
  textFont(gameFont);
  textSize(25);

  text("Time: " + ceil(timeRemaining), width/2,20);
 
  if (gameState == 'start') {
    fill('gray');
    rect(0,0,width,height);
    fill('black');
    text("SQUISH MY BUGS\nPRESS 'SPACE' TO START.",width/2, height/2 - 30);
  }

  if (gameState == 'playing') {
    timeRemaining -= deltaTime/1000;
    text("Score: " + score, width/2, 45);
    if (timeRemaining <= 0) {
      gameState = 'end';
      resetRedbugs();
    }
  }

  if (gameState == 'end') {
    fill(180);
    rect(0,0,width,height);
    fill('white');
    text("TIME'S UP BUCK-O!\nYOU SQUISHED " + score + " BUGS! ", width/2, height/2 - 60);
    text("PRESS 'm' TO PLAY AGAIN.",width/2, height/2 + 15);
  }

  flipRedbugs();
  addToRespawnTimers();
}

class Redbug {
  constructor(sheetPath) {
    this.respawnTimer = 0;
    this.isDead = false;
    this.xPos = randomXSpawn();
    this.yPos = randomYSpawn();
    this.sprite = new Sprite(this.xPos, this.yPos, 80, 80);

    // ✅ FIXED: Pass correct relative path to image
    this.sprite.spriteSheet = sheetPath;

    this.sprite.anis.frameDelay = 8;
    this.animations = {
      walkRight: {row: 0, col: 1, frames: 5},
      squished: {row: 0, col: 6, frames: 1}
    };    
    this.sprite.addAnis(this.animations);
    this.sprite.changeAni('walkRight');
    this.sprite.collider = 'none';
  }

  handleClick() {
    let distance = Math.sqrt(((this.sprite.x - mouseX)**2) + ((this.sprite.y - mouseY)**2));
    if (distance < 20 && !this.isDead){
      RedbugSpeed += speedInc;
      this.sprite.velocity.x = 0;
      this.sprite.changeAni('squished');
      this.isDead = true;
      addToScore(1);
    }
  }

  respawn() {
    if (gameState == 'playing') {
      let newX = randomXSpawn();
      let newY = randomYSpawn();
  
      this.sprite.changeAni('walkRight');
      this.sprite.x = newX;
      this.sprite.y = newY;
  
      if(this.xPos < 0) {
        this.sprite.scale.x = -1;
        this.sprite.velocity.x = RedbugSpeed;
      }
      else {
        this.sprite.velocity.x = -RedbugSpeed;
      }
    }
  }

  flipSides() {
    if (this.sprite.velocity.x > 0) {
      this.sprite.scale.x = 1;
      this.sprite.x = 650;
      this.sprite.y = randomYSpawn();
      this.sprite.velocity.x = -RedbugSpeed;
    }
    else if (this.sprite.velocity.x < 0) {
      this.sprite.scale.x = -1;
      this.sprite.x = -50;
      this.sprite.y = randomYSpawn();
      this.sprite.velocity.x = RedbugSpeed;
    }
  }
}

function randomXSpawn() {
  let sides = [0, 1];
  let side = random(sides);
  return side === 0 ? 650 : -50;
}

function randomYSpawn() {
  return random(50, 590);
}

function startRedbugs() {
  redbugs.forEach(element => {
    if(element.xPos < 0) {
      element.sprite.scale.x = -1;
      element.sprite.velocity.x = RedbugSpeed;
    } else {
      element.sprite.scale.x = 1;
      element.sprite.velocity.x = -RedbugSpeed;
    }
  });
}

function spawnRedbug() {
  // ✅ FIXED: Use correct path to image
  let newRedbug = new Redbug('media/Redbug.png');
  redbugs.unshift(newRedbug);
}

function flipRedbugs() {
  redbugs.forEach(element => {
    if (element.sprite.x > 650 || element.sprite.x < -50) {
      element.flipSides();
    }
  });
}

function addToRespawnTimers() {
  redbugs.forEach(element => {
    if (element.isDead) {
      element.respawnTimer += deltaTime / 1000;
    }
    if (element.respawnTimer > respawnDelay) {
      element.isDead = false;
      element.respawnTimer = 0;
      element.respawn();
    }
  });
}

function addToScore(amount) {
  score += amount;
}

function resetRedbugs() {
  redbugs.forEach(element => {
    element.sprite.velocity.x = 0;
    element.sprite.changeAni('walkRight');
    element.sprite.x = randomXSpawn();
    element.sprite.y = randomYSpawn();
    currentRedBugSpeed = 1; // Optional: Reset speed too
  });
}

function mouseClicked() {
  redbugs.forEach(element => {
    element.handleClick();
  });
}

function keyTyped() {
  if (key === ' ' && gameState === 'start') {
    gameState = 'playing';
    startRedbugs();
  }
  if (key === 'm' && gameState === 'end') {
    timeRemaining = 30;
    score = 0;
    gameState = 'playing';
    startRedbugs();
  }
}
