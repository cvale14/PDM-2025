let filt, rev, polySynth, noise1, ampEnv1, filt1, noiseGain;
let activeKey = null;
let NoiseSlider;

let keyNotes1 = {
  'q': 'C4',
  'w': 'D4',
  'e': 'E4',
  'r': 'F4',
  't': 'G4',
  'y': 'A4',
  'u': 'B4',
  'i': 'C5',
};

function preload() {
  gameFont = loadFont('media/PermanentMarker-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);

  // A slider to control the noise volume or amplitude
  NoiseSlider = createSlider(0, 1, 0.5, 0.01);  // Slider to control noise volume
  NoiseSlider.position(170, 260);

  // Polysynth setup
  rev = new Tone.Reverb(6).toDestination(); 
  polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5,
    },
    oscillator: {
      type: 'square',
    },
    portamento: 0.5,
  }).connect(rev);
  polySynth.volume.value = -6;

  // Amplitude Envelope for Noise
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,   // Initial sustain will be 0
    release: 0.4,
  }).toDestination();

  // Noise setup with a filter
  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink'); // Do NOT start it immediately!
  noise1.connect(filt1);

  // A gain node to control the overall volume of the noise
  noiseGain = new Tone.Gain(0.5).toDestination();
  filt1.connect(noiseGain);  // Connect the filtered noise to the gain node
}

function draw() {
  colorMode(RGB);
  background('green');


  textSize(10);
  textFont(gameFont);
  fill(220);
  textSize(15);
  text("Keys Q-I are the playable keys for the \npolyphonic synth \nPress Z for percussion", 20, 20);
  text("Percussion Volume, Adjusts as you like", 90, 250);
  text("Volume: " + NoiseSlider.value(), 110, 290);

  
  
  let sliderValue = NoiseSlider.value();
  noiseGain.gain.value = sliderValue; // Control the gain (volume) with the slider
}

function keyPressed() {
  let pitch1 = keyNotes1[key];
  
  // Trigger polySynth on key press for playable keys
  if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } else if (key === "z") {
    // Start the noise only when "z" is pressed
    noise1.start(); // Start the noise
    ampEnv1.triggerAttack(); 
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  
  // Stop polySynth or noise when the key is released
  if (pitch1) {
    polySynth.triggerRelease(pitch1);
  } else if (key === "z") {
    // Release the noise when "z" is released
    ampEnv1.triggerRelease();
    noise1.stop(); 
  }
}
