//VARIABLES
let polySynth, rev, filt1, LFOfilt, fmSynth, values, img;
let imgX = 100; 
let imgY = 100; 
let imgWidth = 200; 
let imgHeight = 200;
let imageClicked = false; // Flag to track if the image has been clicked


function preload() {
  img = loadImage('media/cow.jpg'); 
}

function setup() {
  createCanvas(400, 400);


  //my reverb
  rev = new Tone.Reverb(6).toDestination(); 

  // my polyphonic synth
  polySynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5,
    },
    oscillator: {
      type: 'sawtooth', 
    },
    portamento: 0.5,
  }).toDestination();
  polySynth.volume.value = -6;


  // AutoFilter (filt1)
  filt1 = new Tone.AutoFilter({
    frequency: 0.1,
    depth: 0.3,
    baseFrequency: 500,
    octaves: 4, //tracks how often it moves from base frequnce
  }).toDestination().start();



  // LFO, THIS MODULATES the filter frequency
  LFOfilt = new Tone.LFO(0.1, 200, 2000).start();
  LFOfilt.connect(filt1.frequency);



  //FM SYNTH
  fmSynth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
  }).toDestination();



  // Harmonicity values for fmSynth (values array)
  values = new Float32Array([2, 0.05, 0.8, 10, 20, 0.6, 3]);
}



function draw() {
  colorMode(RGB);
  background('purple');
  
  if (imageClicked) {
    // When image is clicked, it will show on canvas
    image(img, imgX, imgY, imgWidth, imgHeight);
  } else {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Click on Canvas to Play Sound", width / 2, height - 30);
  }
}



function mousePressed() {
  // Check if mouse is inside bounds of the cow image.
  if (mouseX > imgX && mouseX < imgX + imgWidth && mouseY > imgY && mouseY < imgY + imgHeight) {
    imageClicked = true;

    // Trigger the synth when image IS CLICKED!!!
    polySynth.triggerAttackRelease("C4", "8n");
    fmSynth.harmonicity.value = 1; 
    fmSynth.triggerAttackRelease(random(200, 400), 10); // Triggers my FM Synth with a random pitch

    fmSynth.harmonicity.setValueAtTime(random(0.1, 0.5), "+2.5");
    fmSynth.harmonicity.setValueCurveAtTime(values, Tone.now(), 10);

    console.log("Image clicked! Sound triggered.");
  }
}
