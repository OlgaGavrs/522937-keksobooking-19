'use strict';
var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var PIN_WIDTH_INACTIVE = 65;
var PIN_HEIGHT_INACTIVE = 65;
var PIN_WIDTH_ACTIVE = 75;
var PIN_HEIGHT_ACTIVE = 87;
var COUNT_OFFERS = 8;
var MAX_ROOMS = 4;
var MAX_GUESTS = 10;
var MAX_X_Y = 600;
var MAX_PRICE = 5000;
var ENTER_KEY = 'Enter';
var CONFERENCE_ROOM = 100;
var CAPACITY_CONFERENCE_ROOM = 0;
var ESC_KEY = 'Escape';
// var ENTER_KEY = 'Enter';

var arrTypes = ['palace', 'flat', 'house', 'bungalo'];
var houseType = {
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
var mainMapPin = document.querySelector('.map__pin--main');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapFilters = mapFiltersContainer.querySelector('.map__filters');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var fragment = document.createDocumentFragment();
var offerCard = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var capacitySelect = adForm.querySelector('#capacity');
var roomSelect = adForm.querySelector('#room_number');

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
          x: getRandomIndex(MAP_WIDTH) - PIN_WIDTH_ACTIVE / 2,
          y: getRandomIndex(MAP_MAX_HEIGHT - MAP_MIN_HEIGHT) + MAP_MIN_HEIGHT - PIN_HEIGHT_ACTIVE}
        }
    );
  }

  return arrOffers;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = (pin.location.x + PIN_WIDTH_ACTIVE / 2) + 'px';
  pinElement.style.top = (pin.location.y + PIN_HEIGHT_ACTIVE) + 'px';
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;

  pinElement.addEventListener('click', function () {
    var onCardEscPress = function (evt) {
      if (evt.key === ESC_KEY) {
        closeCard();
      }
    };

    var closeCard = function () {
      if (map.querySelector('.map__card')) {
        map.querySelector('.map__card').remove();
      }
      document.removeEventListener('keydown', onCardEscPress);
    };

    closeCard();
    offerCard.append(renderCard(pin));
    mapFiltersContainer.before(offerCard);

    var setupClose = map.querySelector('.popup__close');
    setupClose.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onCardEscPress);
  });

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
  cardElement.querySelector('.popup__type').textContent = houseType[card.offer.type.toUpperCase()];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  getFeature(listFeatures, card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  listPhotos.querySelector('.popup__photo').remove();
  card.offer.photos.forEach(function (photo) {
    getPhoto(listPhotos, photo);
  });
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var blockFields = function (form, field) {
  form.querySelectorAll(field).forEach(function (fld) {
    fld.disabled = 'disabled';
  });
};

var unblockFields = function (form, field) {
  form.querySelectorAll(field).forEach(function (fld) {
    fld.removeAttribute('disabled');
  });
};

var getAddress = function () {
  var x = parseInt(mainMapPin.offsetLeft, 10) + PIN_WIDTH_ACTIVE / 2;
  var y = parseInt(mainMapPin.offsetTop, 10) + PIN_HEIGHT_ACTIVE;
  adForm.querySelector('#address').value = x + ', ' + y;
};

var unblockForm = function () {
  map.classList.remove('map--faded');
  drawPin();
  adForm.classList.remove('ad-form--disabled');
  unblockFields(adForm, 'fieldset');
  unblockFields(mapFilters, 'select');
  unblockFields(mapFilters, 'input');
  getAddress();
};

var verificationCapacity = function () {
  var capacity = parseInt(capacitySelect.options[capacitySelect.selectedIndex].value, 10);
  var room = parseInt(roomSelect.options[roomSelect.selectedIndex].value, 10);
  if (room >= capacity) {
    if ((room === 100) && (capacity !== 0)) {
      capacitySelect.setCustomValidity('Такое количество комнат не предназначено для гостей.');
    } else if ((room !== CONFERENCE_ROOM) && (capacity === CAPACITY_CONFERENCE_ROOM)) {
      capacitySelect.setCustomValidity('Укажите количество гостей.');
    } else {
      capacitySelect.setCustomValidity('');
    }
  } else {
    capacitySelect.setCustomValidity('Количество гостей не должно быть больше количества комнат');
  }
};

var drawPin = function () {
  offers.forEach(function (offer) {
    fragment.appendChild(renderPin(offer));
  });
  mapPins.appendChild(fragment);
};

var offers = getArrayOffers();

blockFields(adForm, 'fieldset');
blockFields(mapFilters, 'select');
blockFields(mapFilters, 'input');
var xAddress = parseInt(mainMapPin.style.left, 10) + PIN_WIDTH_INACTIVE / 2;
var yAddress = parseInt(mainMapPin.style.top, 10) + PIN_HEIGHT_INACTIVE / 2;
adForm.querySelector('#address').value = xAddress + ', ' + yAddress;

mainMapPin.addEventListener('mousedown', function (evt) {
  if ((evt.button === 0) && (document.querySelector('.map--faded'))) {
    unblockForm();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    unblockForm();
  }
});

capacitySelect.addEventListener('change', verificationCapacity);
roomSelect.addEventListener('change', verificationCapacity);

