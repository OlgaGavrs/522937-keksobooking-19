'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var features = document.querySelector('#housing-features').querySelectorAll('input');
  var offers = [];

  var updateOffers = function () {
    var clickedFeatures = document.querySelectorAll('.map__checkbox:checked');

    var getOfferPrice = function (price) {
      if (price < PRICE_MIN) {
        return 'low';
      } else if (price >= PRICE_MIN && price < PRICE_MAX) {
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
      var flagType = compareValues(typeSelect, it.offer.type);
      var flagPrice = compareValues(priceSelect, getOfferPrice(it.offer.price));
      var flagRooms = compareValues(roomsSelect, (it.offer.rooms).toString());
      var flagGuests = compareValues(guestsSelect, (it.offer.guests).toString());
      var flagFeatures = true;
      var i = 0;
      while (i < clickedFeatures.length && flagFeatures) {
        if (it.offer.features.indexOf(clickedFeatures[i].value) === -1) {
          flagFeatures = false;
        }
        i++;
      }

      return flagType && flagPrice && flagRooms && flagGuests && flagFeatures;
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
