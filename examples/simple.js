var canplay = require('..');
var getUserMedia = require('getusermedia');
var attach = require('attachmediastream');

getUserMedia({ video: true, audio: false }, function(err, stream) {
  var video = (! err) && attach(stream);

  if (err) {
    return console.error(err);
  }

  canplay(video, function(err) {
    if (err) {
      return console.error(err);
    }

    console.log('ok to play');
  });
});
