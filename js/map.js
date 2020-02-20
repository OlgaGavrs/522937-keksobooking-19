'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');
  var limits = {
    top: map.offsetTop,
    right: map.offsetWidth + map.offsetLeft,
    bottom: map.offsetHeight + map.offsetTop - mainMapPin.offsetHeight,
    left: map.offsetLeft
  };

  mainMapPin.addEventListener('keydown', function (downEvt) {
    window.util.isEnterEvent(downEvt, window.form.unblocking());
  });

  mainMapPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    if ((downEvt.button === 0) && (document.querySelector('.map--faded'))) {
      window.form.unblocking();
      window.form.addres();
    } else {
      var startCoords = {
        x: downEvt.clientX,
        y: downEvt.clientY
      };

      var getCoords = function (evt) {
        var shift = {
          x: startCoords.x - evt.clientX,
          y: startCoords.y - evt.clientY
        };

        startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        if (evt.clientX > limits.right) {
          mainMapPin.style.left = map.offsetWidth - window.data.mainPinWidthActive / 2 + 'px';
        } else if (evt.clientX < limits.left) {
          mainMapPin.style.left = 0 - window.data.mainPinWidthActive / 2 + 'px';
        } else {
          mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
        }
        if (evt.clientY > limits.bottom) {
          mainMapPin.style.top = map.offsetHeight - window.data.mainPinHeightActive + 'px';
        } else if (evt.clientY < limits.top) {
          mainMapPin.style.top = 0;
        } else {
          mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
        }
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        getCoords(moveEvt);
        window.form.addres();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        getCoords(upEvt);
        window.form.addres();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
