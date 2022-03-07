const primary = '#0d2240';
const secondary = '#5a6770ff';
const secondaryLight = '#d44b61ff';
const tertiary = '#c3c6c9ff';
const quaternary = '#343736ff';
const pale = '#e6ecf0';

const $start = $('#start');
const $reset = $('#reset');
const $clapBtn = $('#clap-btn');
const $clapCount = $('#clap-count');
const $subtractCount = $('#subtract');
const $confettiBtn = $('#confetti');
const $modalDismiss = $('#modal-dismiss');
const $cheerBtn = $('#cheer-btn');
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
  textFontSize: 24,
  textMargin: 20,
  // drawText: true,
  // textOrientation: 'curved',
  textAlignment: 'outer',
  textFillStyle: pale,
  segments: [
    {
      fillStyle: primary,
      text: '$50 Target gift card',
      fullText: 'Really, $50 Target GC!'
    },
    {
      fillStyle: tertiary,
      text: 'Amazon GC $50',
      fullText: 'Amazon Gift Card $50'
    },
    {
      fillStyle: quaternary,
      // textFillStyle: primary,
      text: '$50 Target gift card',
      fullText: 'Really, $50 Target GC!'
    },
    {
      fillStyle: secondary,
      text: 'Amazon GC $50',
      fullText: 'Amazon Gift Card $50'
    },
    {
      fillStyle: secondaryLight,
      textFillStyle: primary,
      text: '$50 GC Your Choice',
      fullText: '$50 Gift Card of your Choice!'
    },
    {
      fillStyle: primary,
      text: '$50 Adventure',
      fullText: 'Outdoor Adventure $50'
    },
    {
      fillStyle: tertiary,
      text: '$50 Visa Gift Card',
      fullText: '$50 Visa Gift Card'
    },
    {
      fillStyle: quaternary,
      // textFillStyle: primary,
      text: '$50 Restaurant GC',
      fullText: 'Restaurant of your Choice'
    },
    {
      fillStyle: secondary,
      text: '$50 GC Your Choice',
      fullText: '$50 Gift Card of your Choice!'
    },
    {
      fillStyle: secondaryLight,
      textFillStyle: primary,
      text: '$50 Grocery GC',
      fullText: '$50 for Groceries!'
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
    } else {
      $clapBtn.removeClass('is-active');
      clearInterval(loop);
    }
  }, 750);
});

$cheerBtn.click((evt) => {
  evt.preventDefault();
  // $cheer.pause();
  // $cheer.currentTime = 0;
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
    $start.addClass('is-gradient');
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
  $start.removeClass('is-gradient');
  $corndog.currentTime = 0;
  isSpinning = false;
  confetti.start();
  $cheer.play();
  setTimeout(() => {
    confetti.stop();
  }, 3000);
  $modalFullText.text(segment.fullText);
}
