'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var DEBOUNCE_INTERVAL = 500;

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var features = document.querySelector('#housing-features').querySelectorAll('input');
  var offers = [];

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var updateOfferss = function () {
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

    var sameFilterOfferss = offers.filter(function (it) {
      var typeSelectValue = typeSelect.options[typeSelect.selectedIndex].value;
      var priceSelectValue = priceSelect.options[priceSelect.selectedIndex].value;
      var roomsSelectValue = roomsSelect.options[roomsSelect.selectedIndex].value;
      var guestsSelectValue = guestsSelect.options[guestsSelect.selectedIndex].value;
      var flagFeatures = true;
      for (var i = 0; i < clickedFeatures.length; i++) {
        if (it.offer.features.indexOf(clickedFeatures[i].value) === -1) {
          flagFeatures = false;
        }
      }

      var offerType = typeSelectValue === 'any' ? 'any' : it.offer.type;
      var offerPrice = priceSelectValue === 'any' ? 'any' : getOfferPrice(it.offer.price);
      var offerRooms = roomsSelectValue === 'any' ? 'any' : (it.offer.rooms).toString();
      var offerGuests = guestsSelectValue === 'any' ? 'any' : (it.offer.guests).toString();

      return (offerType === typeSelectValue) && (offerPrice === priceSelectValue) && (offerRooms === roomsSelectValue) && (offerGuests === guestsSelectValue)
      && flagFeatures;
    });

    window.pin.delete();
    window.pin.render(sameFilterOfferss);
    window.card.closing();
  };

  typeSelect.addEventListener('change', debounce(updateOfferss));
  priceSelect.addEventListener('change', debounce(updateOfferss));
  roomsSelect.addEventListener('change', debounce(updateOfferss));
  guestsSelect.addEventListener('change', debounce(updateOfferss));
  features.forEach(function (feature) {
    feature.addEventListener('change', debounce(updateOfferss));
  });

  var successHandler = function (data) {
    offers = data;
    updateOfferss();
  };

  var displayError = function (textError) {
    window.backend.display('error', textError);
  };

  window.similar = function () {
    window.backend.load('GET', URL_LOAD, successHandler, displayError);
  };
})();
