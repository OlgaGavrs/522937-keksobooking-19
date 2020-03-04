'use strict';
(function () {
  var COUNT_OFFERS = 8;
  var MAX_ROOMS = 4;
  var MAX_GUESTS = 10;
  var MAX_X_Y = 600;
  var MAX_PRICE = 5000;
  var MAP_WIDTH = 1200;
  var MAP_MIN_HEIGHT = 130;
  var MAP_MAX_HEIGHT = 630;
  var MAIN_PIN_WIDTH_ACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 81;
  var MAIN_PIN_WIDTH_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var arrTypes = ['palace', 'flat', 'house', 'bungalo'];
  var availibleTime = ['12:00', '13:00', '14:00'];

  var getArrayOffers = function () {
    var arrOffers = [];
    for (var i = 0; i < COUNT_OFFERS; i++) {
      arrOffers.push(
          {author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'},
          offer: {
            title: 'Title' + i,
            address: window.util.randomIndex(MAX_X_Y) + ', ' + window.util.randomIndex(MAX_X_Y),
            price: window.util.randomIndex(MAX_PRICE),
            type: arrTypes[window.util.randomIndex(arrTypes.length)],
            rooms: window.util.randomIndex(MAX_ROOMS),
            guests: window.util.randomIndex(MAX_GUESTS),
            checkin: availibleTime[window.util.randomIndex(availibleTime.length)],
            checkout: availibleTime[window.util.randomIndex(availibleTime.length)],
            features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
            description: 'Строка с описанием',
            photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
          },
          location: {
            x: window.util.randomIndex(MAP_WIDTH), // - PIN_WIDTH / 2,
            y: window.util.randomIndex(MAP_MAX_HEIGHT - MAP_MIN_HEIGHT) + MAP_MIN_HEIGHT} // - PIN_HEIGHT}
          }
      );
    }

    return arrOffers;
  };

  window.data = {
    mainPinWidthActive: MAIN_PIN_WIDTH_ACTIVE,
    mainPinHeightActive: MAIN_PIN_HEIGHT_ACTIVE,
    mainPinWidthInactive: MAIN_PIN_WIDTH_INACTIVE,
    mainPinHeightInactive: MAIN_PIN_HEIGHT_INACTIVE,
    pinWidth: PIN_WIDTH,
    pinHeight: PIN_HEIGHT,
    yMin: MAP_MIN_HEIGHT,
    yMax: MAP_MAX_HEIGHT,
    offers: getArrayOffers()
  };
})();
