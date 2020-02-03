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
var mapFilters = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var fragment = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();

var getRandomIndex = function (maxIndex) {
  return Math.floor(Math.random() * maxIndex);
};

var getArrayOffers = function () {
  var arrOffers = [];
  for (var i = 0; i < COUNT_OFFERS; i++) {
    arrOffers.push(
        {author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'},
        offer: {
          title: 'Title' + i,
          address: getRandomIndex(600) + ', ' + getRandomIndex(600),
          price: getRandomIndex(5000),
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
  return arrOffers;
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

var renderCard = function (offer) {
  var cardElement = cardTemplate.cloneNode(true);
  var type;
  var listPhotos = cardElement.querySelector('.popup__photos');
  var listFeatures = cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  switch (offer.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
  }
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  while (listFeatures.firstChild) {
    listFeatures.removeChild(listFeatures.firstChild);
  }
  offer.offer.features.forEach(function (vol) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    switch (vol) {
      case 'wifi':
        feature.classList.add('popup__feature--wifi');
        break;
      case 'dishwasher':
        feature.classList.add('popup__feature--dishwasher');
        break;
      case 'parking':
        feature.classList.add('popup__feature--parking');
        break;
      case 'washer':
        feature.classList.add('popup__feature--washer');
        break;
      case 'elevator':
        feature.classList.add('popup__feature--elevator');
        break;
      case 'conditioner':
        feature.classList.add('popup__feature--conditioner');
        break;
    }
    listFeatures.appendChild(feature);
  });
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  listPhotos.querySelector('.popup__photo').remove();
  offer.offer.photos.forEach(function (img) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = img;
    photo.width = 45;
    photo.height = 40;
    listPhotos.appendChild(photo);
  });
  cardElement.querySelector('.popup__avatar').style.src = offer.author.avatar;
  return cardElement;
};

map.classList.remove('map--faded');

var offers = getArrayOffers();

offers.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});

mapPins.appendChild(fragment);

fragment2.append(renderCard(offers[0]));

mapFilters.before(fragment2);
