'use strict';
(function () {
  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', function (evt) {
    if ((evt.button === 0) && (document.querySelector('.map--faded'))) {
      window.form.unblocking();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.form.unblocking());
  });
})();
