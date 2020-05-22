const red = '#ff0033';
const blue = '#0c233f';

const $start = $('#start');
const $reset = $('#reset');
const $corndog = $('#corndog')[0];
$corndog.loop = true;

let isSpinning = false;

let myWheel = new Winwheel({
  numSegments: 8,
  outerRadius: 250,
  innerRadius: 100,
  textFontSize: 16,
  textMargin: 0,
  segments: [
    {
      fillStyle: red,
      textFillStyle: '#ffffff',
      textAlignment: 'right',
      text: 'segment text'
    },
    { fillStyle: blue, text: 'segment text' },
    { fillStyle: red, text: 'segment text' },
    { fillStyle: blue, text: 'segment text' },
    { fillStyle: red, text: 'segment text' },
    { fillStyle: blue, text: 'segment text' },
    { fillStyle: red, text: 'segment text' },
    { fillStyle: blue, text: 'segment text' }
  ],
  animation: {
    type: 'spinToStop',
    duration: 10,
    spins: 6,
    callbackFinished: onFinished
  }
});


$start.click((evt) => {
  evt.preventDefault();
  startSpin();
});

$reset.click((evt) => {
  evt.preventDefault();
  $corndog.pause();
  $corndog.currentTime = 0;
  myWheel.stopAnimation(false);
  isSpinning = false;
  myWheel.rotationAngle = 0;
  myWheel.draw();
});

function startSpin() {
  if (!isSpinning) {
    $corndog.play();
    myWheel.animation.duration = rdm(9, 11);
    myWheel.animation.spin = rdm(4, 20);
    console.log({
      duration: myWheel.animation.duration,
      spin: myWheel.animation.spin
    });
    myWheel.startAnimation();
    isSpinning = true;
  }
}

function rdm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onLoad() {}

function onFinished(segment) {
  $corndog.pause();
  $corndog.currentTime = 0;
  isSpinning = false;
  console.log({ segment });
  alert(JSON.stringify(segment.text));
}
