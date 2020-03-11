'use strict';
(function () {
  var COUNT_OFFERS = 5;

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

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

  var unblockFields = function (form, field) {
    form.querySelectorAll(field).forEach(function (fld) {
      fld.removeAttribute('disabled');
    });
  };

  window.pin = {
    render: function (data) {
      var takeNumber = data.length > COUNT_OFFERS ? COUNT_OFFERS : data.length;
      fragment.innerHTML = '';
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(renderPin(data[i]));
      }
      mapPins.appendChild(fragment);
      unblockFields(adForm, 'fieldset');
      unblockFields(mapFilters, 'select');
      unblockFields(mapFilters, 'input');
    },
    delete: function () {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
