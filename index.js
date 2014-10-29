var EVENTS = ['canplay', 'loadedmetadata'];

/**
  # canplay

  This is a super simple function designed to trigger a callback when the
  supplied media element can be played.  This is particularly useful when
  working with the `getUserMedia` API as capture succeeds before frames can
  be rendered to the display (or captured through canvas drawing).

  ## Example Usage

  <<< examples/simple.js
**/
module.exports = function(el, callback) {
  var playableTimer;

  function canplay(evt) {
    if (el.videoWidth === 0 || el.videoHeight === 0) {
      clearTimeout(playableTimer);
      playableTimer = setTimeout(canplay, 100);

      return;
    }

    el.play();
    EVENTS.forEach(function(eventName) {
      el.removeEventListener(eventName, canplay);
    });

    callback(null, el);
  }

  if (el.readyState >= 3) {
    return callback(null, el);
  }

  EVENTS.forEach(function(eventName) {
    el.addEventListener(eventName, canplay, false);
  });

  return false;
};
