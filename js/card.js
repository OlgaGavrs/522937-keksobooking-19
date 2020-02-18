'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var offerCard = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var HouseType = {
    PALACE: {
      name: 'Дворец',
      price: 10000
    },
    BUNGALO: {
      name: 'Бунгало',
      price: 0
    },
    FLAT: {
      name: 'Квартира',
      price: 1000
    },
    HOUSE: {
      name: 'Дом',
      price: 5000
    }
  };
  var photoStyle = {
    width: 45,
    height: 40
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard());
  };

  var closeCard = function () {
    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var listPhotos = cardElement.querySelector('.popup__photos');
    var listFeatures = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HouseType[card.offer.type.toUpperCase()].name;
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

  window.card = {
    opening: function (pin) {
      offerCard.append(renderCard(pin));
      mapFiltersContainer.before(offerCard);
      var setupClose = map.querySelector('.popup__close');
      setupClose.addEventListener('click', function () {
        closeCard();
      });
      document.addEventListener('keydown', onCardEscPress);
    },
    closing: function () {
      closeCard();
    }
  };
})();
