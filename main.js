const primary = '#0d2240';
const secondary = '#7c98ab';
const tertiary = '#e94f3e';
const pale = '#e6ecf0';

const $start = $('#start');
const $reset = $('#reset');
const $clapBtn = $('#clap-btn');
const $clapCount = $('#clap-count');
const $subtractCount = $('#subtract');
const $confettiBtn = $('#confetti');
const $modalDismiss = $('#modal-dismiss');
const $cheerBtn = $('#cheer');
const $addCount = $('#add');
const $modal = $('#modal');
const $modalFullText = $('#full-text');

const $corndog = $('#corndog')[0];
$corndog.loop = true;
const $cheer = $('#cheer')[0];
const $clap = $('#clap')[0];

let isSpinning = false;
let count = 1;
$clapCount.text(count);

let myWheel = new Winwheel({
  numSegments: 10,
  outerRadius: 350,
  innerRadius: 100,
  textFontSize: 18,
  textMargin: 20,
  drawText: true,
  textOrientation: 'curved',
  textAlignment: 'outer',
  textFillStyle: pale,
  segments: [
    {
      fillStyle: primary,
      text: '$100',
      fullText: 'Outdoor Adventure $100'
    },
    {
      fillStyle: '#7aa0bf',
      text: 'PTO',
      fullText: 'Make It Awesome - One Day PTO'
    },
    {
      fillStyle: '#ee725f',
      text: '$100',
      fullText: 'Outdoor Adventure $100'
    },
    {
      fillStyle: '#152043',
      text: '$50',
      fullText: 'Do the right thing'
    },
    {
      fillStyle: '#4c679d',
      text: '$50',
      fullText: 'Downtown Dollars'
    },
    {
      fillStyle: tertiary,
      text: '$100',
      fullText: 'Do the Right Thing'
    },
    {
      fillStyle: '#3c6c92',
      text: '$50',
      fullText: 'Pay It Forward — $50 Donaition to Charity'
    },
    {
      fillStyle: tertiary,
      text: 'PTO',
      fullText: 'Make It Awesome - One Day PTO'
    },
    {
      fillStyle: secondary,
      text: '$100',
      fullText: 'Out of things'
    },
    {
      fillStyle: tertiary,
      text: 'Freedom',
      fullText: 'Yes Freedom'
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
  let i = count;
  $clapBtn.addClass('is-active');
  const loop = setInterval(() => {
    if (i > 0) {
      $clap.pause();
      $clap.play();
      i--;
      // console.log({ i });
    } else {
      count++;
      $clapCount.text(count);
      $clapBtn.removeClass('is-active');
      clearInterval(loop);
    }
  }, 800);
});

$cheerBtn.click((evt) => {
  evt.preventDefault();
  $cheer.play();
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

$confettiBtn.click((evt) => {
  evt.preventDefault();
  $confettiBtn.toggleClass('active');
  (confetti.isRunning())
    ? confetti.stop()
    : confetti.start();
});

$modalDismiss.click((evt) => {
  evt.preventDefault();
  $modal.toggleClass('is-hidden');
  $modalDismiss.toggleClass('active');
});

function startSpin() {
  myWheel.stopAnimation(false);
  myWheel.rotationAngle = 0;
  myWheel.draw();
  if (!isSpinning) {
    $corndog.play();

    myWheel.animation.duration = rdm(9, 11);
    myWheel.animation.spin = rdm(4, 50);
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
  setTimeout(() => {
    confetti.stop();
  }, 3000);
  $modalFullText.text(segment.fullText);
}
