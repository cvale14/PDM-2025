let startContext, samples, sampler, button1, button2, button3, button4;

let del = new Tone.FeedbackDelay(0).toDestination()

function preload() {
  // Load the sample sound
  gameFont = loadFont('media/PermanentMarker-Regular.ttf');
}
  samples = new Tone.Players({
    cat: "media/hungry_cat.mp3",
    explosion: "media/Explosion.mp3",
    drums: "media/drum_beat.mp3",
    man: "media/Another_one.mp3",
    
  }).connect(del)


function setup() {
  createCanvas(400, 400);

  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
  
  // Create the button and position it
  button1 = createButton("Play Cat Sample");
  button1.position(10, 50);
  button2 = createButton("Play Explosion Sample");
  button2.position(10, 110);
  button3 = createButton("Play Drums Sample");
  button3.position(210, 50);
  button4 = createButton("Play DJ Khalid Sample");
  button4.position(210, 110);
  button1.mousePressed(() => {samples.player("cat").start()})//key and pair values, access our player through the key as a string
  button2.mousePressed(() => {samples.player("explosion").start()})
  button3.mousePressed(() => {samples.player("drums").start()})
  button4.mousePressed(() => {samples.player("man").start()})
  delTimeSlider = createSlider(0, 1, 0, 0.05);
  delTimeSlider.position(10, 170);
  delTimeSlider.input(() =>{del.delayTime.value = delTimeSlider.value()})
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(210, 170);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});

  

  // Ensure Tone.js is fully ready by enabling interaction
  Tone.start(); 
}

function draw() {
  colorMode(RGB);
  background('red')
  
  text("Delay Time: " + delTimeSlider.value(), 15, 170);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 170);

  textSize(10);
  textFont(gameFont);
  fill(220);
  textSize(15);
  text('Press the buttons to make sounds.\nUse the sliders to manipulate the\nfeedback and delay effects', 50, 225);
  
}


function startAudioContext() {
  if(Tone.context.state != 'running') {//state, means state of audio
  Tone.start();
  console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already runnning")
  }

}
