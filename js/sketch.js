let initTone = true;
let pitch = 2000;
let photo;

let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

let noiseFilter = new Tone.Filter(1000, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter)

function setup() {
  createCanvas(400, 400);
  photo = loadImage('Mario.jpg')
}

function draw() {
  background(220, 0, 0);

  if ((frameCount % 60) === 0) {
    pitch = random(2000, 3000);
  }

  text('press spacebar to initialize audio!', 100, 50);
  text('Make Mario collect them coins!!!!!', 100, 100)
  image(photo, 125, 125);

}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('16n');
  osc.frequency.setValueAtTime(pitch+1000, '+0.5');
  ampEnv.triggerAttackRelease('16n', '+0.5');

  if (mouseY > 200) {
    noiseEnv.triggerAttackRelease(0);
  }

}