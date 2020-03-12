'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var features = document.querySelector('#housing-features').querySelectorAll('input');
  var offers = [];

  var updateOffers = function () {
    var clickedFeatures = document.querySelectorAll('.map__checkbox:checked');

    var getOfferPrice = function (price) {
      if (price < 10000) {
        return 'low';
      } else if (price >= 10000 && price < 50000) {
        return 'middle';
      } else {
        return 'high';
      }
    };

    var compareValues = function (select, value) {
      var selectValue = select.options[select.selectedIndex].value;
      var offerValue = selectValue === 'any' ? 'any' : value;
      return (offerValue === selectValue);
    };

    var sameFilterOffers = offers.filter(function (it) {
      var flagFeatures = true;
      for (var i = 0; i < clickedFeatures.length; i++) {
        if (it.offer.features.indexOf(clickedFeatures[i].value) === -1) {
          flagFeatures = false;
        }
      }

      return compareValues(typeSelect, it.offer.type) && compareValues(priceSelect, getOfferPrice(it.offer.price)) &&
      compareValues(roomsSelect, (it.offer.rooms).toString()) && compareValues(guestsSelect, (it.offer.guests).toString())
      && flagFeatures;
    });

    window.pin.delete();
    window.pin.render(sameFilterOffers);
    window.card.closing();
  };

  typeSelect.addEventListener('change', window.util.debounce(updateOffers));
  priceSelect.addEventListener('change', window.util.debounce(updateOffers));
  roomsSelect.addEventListener('change', window.util.debounce(updateOffers));
  guestsSelect.addEventListener('change', window.util.debounce(updateOffers));
  features.forEach(function (feature) {
    feature.addEventListener('change', window.util.debounce(updateOffers));
  });

  var successHandler = function (data) {
    offers = data;
    updateOffers();
  };

  var displayError = function (textError) {
    window.backend.display('error', textError);
  };

  window.similar = function () {
    window.backend.load('GET', URL_LOAD, successHandler, displayError);
  };
})();
