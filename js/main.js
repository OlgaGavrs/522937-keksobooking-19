'use strict';
var COUNT_OFFERS = 8;

var arrTypes = ['palace', 'flat', 'house', 'bungalo'];
var arrOfers = [];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getRandomIndex = function (maxIndex) {
  return Math.floor(Math.random() * maxIndex);
};

for (var i = 0; i < COUNT_OFFERS; i++) {
  arrOfers.push(
      {author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'},
      offer: {
        title: 'Title' + i,
        address: '600, 350',
        price: 'Price' + i,
        type: arrTypes[getRandomIndex(4)],
        rooms: getRandomIndex(4),
        guests: getRandomIndex(10),
        checkin: '12:00',
        checkout: '12:00',
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Строка с описанием',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: getRandomIndex(300),
        y: getRandomIndex(600)}
      }
  );
}

map.classList.remove('map--faded');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var x = pin.location.x;
  var y = pin.location.y;
  pinElement.style.left = x + 'px';
  pinElement.style.top = y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

arrOfers.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});

mapPins.appendChild(fragment);
