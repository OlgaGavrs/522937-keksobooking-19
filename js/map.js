'use strict';
(function () {

  var map = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');
  var limits = {
    top: window.data.yMin - window.data.mainPinHeightActive,
    right: map.offsetWidth + map.offsetLeft,
    bottom: window.data.yMax - window.data.mainPinHeightActive,
    left: map.offsetLeft
  };

  mainMapPin.addEventListener('keydown', function (downEvt) {
    window.util.isEnterEvent(downEvt, window.form.unblocking());
  });

  mainMapPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.pageX,
      y: downEvt.pageY
    };

    var getCoords = function (evt) {
      var shift = {
        x: startCoords.x - evt.pageX,
        y: startCoords.y - evt.pageY
      };

      startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };

      if (evt.pageX > limits.right) {
        mainMapPin.style.left = map.offsetWidth - window.data.mainPinWidthActive / 2 + 'px';
      } else if (evt.pageX < limits.left) {
        mainMapPin.style.left = 0 - window.data.mainPinWidthActive / 2 + 'px';
      } else {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      }
      if (evt.pageY > limits.bottom) {
        mainMapPin.style.top = limits.bottom + 'px';
      } else if (evt.pageY < limits.top) {
        mainMapPin.style.top = limits.top + 'px';
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

    if ((downEvt.button === 0) && (document.querySelector('.map--faded'))) {
      window.form.unblocking();
      window.form.addres();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
