'use strict';
(function () {
  var MAIN_PIN_START_X = '570px';
  var MAIN_PIN_START_Y = '375px';
  var CONFERENCE_ROOM = 100;
  var CAPACITY_CONFERENCE_ROOM = 0;
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var xAddress = Math.floor(parseInt(mainMapPin.style.left, 10) + window.data.mainPinWidthInactive / 2);
  var yAddress = Math.floor(parseInt(mainMapPin.style.top, 10) + window.data.mainPinHeightInactive / 2);
  var capacitySelect = adForm.querySelector('#capacity');
  var roomSelect = adForm.querySelector('#room_number');
  var typeSelect = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var HouseType = window.card.House;

  var blockFields = function (form, field) {
    form.querySelectorAll(field).forEach(function (fld) {
      fld.disabled = 'disabled';
    });
  };

  var blockAllFields = function () {
    blockFields(adForm, 'fieldset');
    blockFields(mapFilters, 'select');
    blockFields(mapFilters, 'input');
  };

  var unblockFields = function (form, field) {
    form.querySelectorAll(field).forEach(function (fld) {
      fld.removeAttribute('disabled');
    });
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

  var verificationPrice = function () {
    var type = typeSelect.options[typeSelect.selectedIndex].value;
    price.min = HouseType[type.toUpperCase()].price;
    price.placeholder = HouseType[type.toUpperCase()].price;
  };

  var displayMessage = function () {
    window.backend.display('success');
  };

  var displayError = function (textError) {
    window.backend.display('error', textError);
  };

  var reset = function () {
    map.classList.add('map--faded');
    adForm.reset();
    mapFilters.reset();
    mainMapPin.style.left = MAIN_PIN_START_X;
    mainMapPin.style.top = MAIN_PIN_START_Y;
    window.pin.delete();
    window.card.closing();
    adForm.classList.add('ad-form--disabled');
    blockAllFields();
  };

  blockAllFields();

  adForm.querySelector('#address').value = xAddress + ', ' + yAddress;

  capacitySelect.addEventListener('change', verificationCapacity);
  roomSelect.addEventListener('change', verificationCapacity);
  typeSelect.addEventListener('change', verificationPrice);
  price.addEventListener('change', verificationPrice);
  timeinSelect.addEventListener('change', function () {
    timeoutSelect.value = timeinSelect.value;
  });

  timeoutSelect.addEventListener('change', function () {
    timeinSelect.value = timeoutSelect.value;
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.load('POST', URL_SAVE, function () {
      reset();
      displayMessage();
    }, displayError, new FormData(adForm));
    evt.preventDefault();
  });

  adForm.querySelector('.ad-form__reset').addEventListener('click', function () {
    reset();
  });

  window.form = {
    unblocking: function () {
      map.classList.remove('map--faded');
      window.pin.drawing();
      adForm.classList.remove('ad-form--disabled');
      unblockFields(adForm, 'fieldset');
      unblockFields(mapFilters, 'select');
      unblockFields(mapFilters, 'input');
    },
    addres: function () {
      var x = Math.floor(parseInt(mainMapPin.offsetLeft, 10) + window.data.mainPinWidthActive / 2);
      var y = Math.floor(parseInt(mainMapPin.offsetTop, 10) + window.data.mainPinHeightActive);
      adForm.querySelector('#address').value = x + ', ' + y;
    }
  };
})();
