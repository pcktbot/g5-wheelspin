const red = '#ff0033';
const blue = '#0c233f';


window.onload = function () {
  let isSpinning = false;
  let myWheel = new Winwheel({
    'numSegments': 8,
    'outerRadius': 250,
    'innerRadius': 25,
    'textFontSize': 16,
    'textMargin': 0,
    'segments': [
      {
        'fillStyle': red,
        'textFillStyle': '#ffffff',
        'textAlignment': 'right',
        'text': 'segment text'
      },
      { 'fillStyle': blue, 'text': 'segment text' },
      { 'fillStyle': red, 'text': 'segment text' },
      { 'fillStyle': blue, 'text': 'segment text' },
      { 'fillStyle': red, 'text': 'segment text' },
      { 'fillStyle': blue, 'text': 'segment text' },
      { 'fillStyle': red, 'text': 'segment text' },
      { 'fillStyle': blue, 'text': 'segment text' }
    ],
    'animation': {
      'type': 'spinToStop',
      'duration': 5,
      'spins': 4,
      'callbackFinished': (segment) => {
        console.log(segment.fillStyle);
        segment.fillStyle = '#52be99';
      }
    }
  });

  function toggleSpin(forceFalse = false) {
    if (forceFalse) {
      isSpinning = false;
      console.log('%c forcing false', 'color: red;');
      myWheel.stopAnimation(false);
    } else {
      isSpinning = !isSpinning;
    }
  }
  document.getElementById('start').addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log({ evt });
    toggleSpin(true);
    myWheel.startAnimation();
  });
  document.getElementById('stop').addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleSpin(true);
    myWheel.stopAnimation(false);
  })
  document.getElementById('reset').addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleSpin(true);
    myWheel.stopAnimation(false);
    myWheel.rotationAngle = 0;
    myWheel.draw();
  });
};
