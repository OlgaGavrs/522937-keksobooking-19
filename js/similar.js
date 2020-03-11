'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var typeSelect = document.querySelector('#housing-type');
  var offers = [];

  var updateOfferss = function () {

    var sameTypeOfferss = offers.filter(function (it) {
      return it.offer.type === typeSelect.options[typeSelect.selectedIndex].value;
    });

    window.pin.delete();
    if (typeSelect.options[typeSelect.selectedIndex].value === 'any') {
      window.pin.render(offers);
    } else {
      window.pin.render(sameTypeOfferss);
    }

    window.card.closing();
  };

  typeSelect.addEventListener('change', updateOfferss);

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
