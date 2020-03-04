'use strict';
(function () {
  var MAP_MIN_HEIGHT = 130;
  var MAP_MAX_HEIGHT = 630;
  var MAIN_PIN_WIDTH_ACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 81;
  var MAIN_PIN_WIDTH_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.data = {
    mainPinWidthActive: MAIN_PIN_WIDTH_ACTIVE,
    mainPinHeightActive: MAIN_PIN_HEIGHT_ACTIVE,
    mainPinWidthInactive: MAIN_PIN_WIDTH_INACTIVE,
    mainPinHeightInactive: MAIN_PIN_HEIGHT_INACTIVE,
    pinWidth: PIN_WIDTH,
    pinHeight: PIN_HEIGHT,
    yMin: MAP_MIN_HEIGHT,
    yMax: MAP_MAX_HEIGHT
  };
})();
