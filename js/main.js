'use strict';
var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COUNT_OFFERS = 8;
var MAX_ROOMS = 4;
var MAX_GUESTS = 10;

var arrTypes = ['palace', 'flat', 'house', 'bungalo'];
var arrCheck = ['12:00', '13:00', '14:00'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getRandomIndex = function (maxIndex) {
  return Math.floor(Math.random() * maxIndex);
};

var getArrayOfers = function () {
  var arrOfers = [];
  for (var i = 0; i < COUNT_OFFERS; i++) {
    arrOfers.push(
        {author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'},
        offer: {
          title: 'Title' + i,
          address: getRandomIndex(600) + ', ' + getRandomIndex(600),
          price: getRandomIndex(300) + '$',
          type: arrTypes[getRandomIndex(arrTypes.length)],
          rooms: getRandomIndex(MAX_ROOMS),
          guests: getRandomIndex(MAX_GUESTS),
          checkin: arrCheck[getRandomIndex(arrCheck.length)],
          checkout: arrCheck[getRandomIndex(arrCheck.length)],
          features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
          description: 'Строка с описанием',
          photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
        },
        location: {
          x: getRandomIndex(MAP_WIDTH) - PIN_WIDTH / 2,
          y: getRandomIndex(MAP_MAX_HEIGHT - MAP_MIN_HEIGHT) + MAP_MIN_HEIGHT - PIN_HEIGHT}
        }
    );
  }
  return arrOfers;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style.left = (pin.location.x + PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (pin.location.y + PIN_HEIGHT) + 'px';
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  return pinElement;
};

map.classList.remove('map--faded');

var ofers = getArrayOfers();

ofers.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});

mapPins.appendChild(fragment);
