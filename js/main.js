'use strict';
var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COUNT_OFFERS = 8;
var MAX_ROOMS = 4;
var MAX_GUESTS = 10;
var MAX_X_Y = 600;
var MAX_PRICE = 5000;

var arrTypes = ['palace', 'flat', 'house', 'bungalo'];
var HouseType = {
  PALACE: 'Дворец',
  BUNGALO: 'Бунгало',
  FLAT: 'Квартира',
  HOUSE: 'Дом'
};
var arrCheck = ['12:00', '13:00', '14:00'];
var photoStyle = {
  width: 45,
  height: 40
};
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
var OfferCard = document.createDocumentFragment();

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
          address: getRandomIndex(MAX_X_Y) + ', ' + getRandomIndex(MAX_X_Y),
          price: getRandomIndex(MAX_PRICE),
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

var getFeature = function (list, features) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  features.forEach(function (feature) {
    var featureItem = document.createElement('li');

    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + feature);
    list.appendChild(featureItem);
  });
};

var getPhoto = function (list, image) {
  var photo = document.createElement('img');

  photo.classList.add('popup__photo');
  photo.src = image;
  photo.width = photoStyle.width;
  photo.height = photoStyle.height;
  list.appendChild(photo);
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var listPhotos = cardElement.querySelector('.popup__photos');
  var listFeatures = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HouseType[card.offer.type.toUpperCase()];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  getFeature(listFeatures, card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  listPhotos.querySelector('.popup__photo').remove();
  card.offer.photos.forEach(function (photo) {
    getPhoto(listPhotos, photo);
  });
  cardElement.querySelector('.popup__avatar').style.src = card.author.avatar;

  return cardElement;
};

map.classList.remove('map--faded');

var offers = getArrayOffers();

offers.forEach(function (offer) {
  fragment.appendChild(renderPin(offer));
});

mapPins.appendChild(fragment);

OfferCard.append(renderCard(offers[0]));

mapFilters.before(OfferCard);
