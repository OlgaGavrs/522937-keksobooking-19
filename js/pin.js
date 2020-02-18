'use strict';
(function () {
  var PIN_WIDTH_ACTIVE = 75;
  var PIN_HEIGHT_ACTIVE = 87;

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

    pinElement.style.left = (pin.location.x + PIN_WIDTH_ACTIVE / 2) + 'px';
    pinElement.style.top = (pin.location.y + PIN_HEIGHT_ACTIVE) + 'px';
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    pinElement.addEventListener('click', openCard);

    pinElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openCard);
    });

    return pinElement;
  };

  window.pin = {
    drawing: function () {
      window.data.forEach(function (offer) {
        fragment.appendChild(renderPin(offer));
      });
      mapPins.appendChild(fragment);
    }
  };
})();
