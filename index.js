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

  function canplay(evt) {
    el.play();
    el.removeEventListener('canplay', canplay);
    el.removeEventListener('loadedmetadata', canplay);
    callback(null, el);
  }

  if (el.readyState >= 3) {
    return callback(null, el);
  }

  el.addEventListener('canplay', canplay, false);
  el.addEventListener('loadedmetadata', canplay, false);

  return false;
};
