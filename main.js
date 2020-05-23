const primary = '#0d2240';
const secondary = '#7c98ab';
const tertiary = '#e94f3e';
const pale = '#e6ecf0';

const $start = $('#start');
const $reset = $('#reset');
const $clapBtn = $('#clap-btn');
const $clapCount = $('#clap-count');
const $subtractCount = $('#subtract');
const $addCount = $('#add');

const $corndog = $('#corndog')[0];
$corndog.loop = true;
const $cheer = $('#cheer')[0];
const $clap = $('#clap')[0];

let isSpinning = false;
let count = 1;
$clapCount.text(count);

let myWheel = new Winwheel({
  numSegments: 9,
  outerRadius: 250,
  innerRadius: 100,
  textFontSize: 16,
  textMargin: 0,
  segments: [
    {
      fillStyle: primary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: secondary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: tertiary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: primary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: secondary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: tertiary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: primary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: secondary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    },
    {
      fillStyle: tertiary,
      textFillStyle: pale,
      textAlignment: 'right',
      text: 'segment text'
    }
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

$subtractCount.click((evt) => {
  evt.preventDefault();
  count = (count <= 0) ? 0 : count - 1;
  $clapCount.text(count);
});

$addCount.click((evt) => {
  evt.preventDefault();
  count = (count >= 15) ? 15 : count + 1;
  $clapCount.text(count);
});

$clapBtn.click((evt) => {
  evt.preventDefault();
  $clap.play();
});

$reset.click((evt) => {
  evt.preventDefault();
  $corndog.pause();
  $corndog.currentTime = 0;
  isSpinning = false;
  myWheel.stopAnimation(false);
  myWheel.rotationAngle = 0;
  myWheel.draw();
  confetti.remove();
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
  confetti.start();
  $cheer.play();
  // alert(JSON.stringify(segment.text));
}
