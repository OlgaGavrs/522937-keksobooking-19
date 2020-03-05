'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    var openCard = function () {
      window.card.closing();
      window.card.opening(pin);
    };

    pinElement.style.left = (pin.location.x - window.data.pinWidth / 2) + 'px';
    pinElement.style.top = (pin.location.y - window.data.pinHeight) + 'px';
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    pinElement.addEventListener('click', openCard);

    pinElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openCard);
    });

    return pinElement;
  };

  var displayError = function (textError) {
    window.backend.display('error', textError);
  };

  window.pin = {
    drawing: function () {
      window.backend.load('GET', URL_LOAD, function (offers) {
        offers.forEach(function (offer) {
          fragment.appendChild(renderPin(offer));
        });
        mapPins.appendChild(fragment);
      }, displayError);
    },
    delete: function () {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
