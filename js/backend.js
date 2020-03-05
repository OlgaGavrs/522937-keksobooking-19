'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.backend = {
    load: function (method, URL, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(method, URL);
      if (!data) {
        data = '';
      }
      xhr.send(data);
    },
    display: function (typeMessage, text) {
      var idTemplate = '#' + typeMessage;
      var classTemplate = '.' + typeMessage;
      var classMessageText = '.' + typeMessage + '__message';
      var fragment = document.createDocumentFragment();
      var template = document.querySelector(idTemplate)
        .content
        .querySelector(classTemplate);
      var element = template.cloneNode(true);
      fragment.append(element);
      document.querySelector('main').append(fragment);

      var message = document.querySelector(classTemplate);
      var messageText = message.querySelector(classMessageText);

      if (text) {
        messageText.textContent = text;
      }

      var onMessageEscPress = function (evt) {
        window.util.isEscEvent(evt, closeMessage);
      };

      var closeMessage = function () {
        message.remove();
        document.removeEventListener('keydown', onMessageEscPress);
        document.removeEventListener('click', closeMessage);
        // message.querySelector('.error__button').removeEventListener('click', closeMessage);
      };

      // if (message.querySelector('.error__button')) {
      //   message.querySelector('.error__button').addEventListener('click', closeMessage);
      // }
      document.addEventListener('keydown', onMessageEscPress);
      document.addEventListener('click', closeMessage);
    }
  };
})();
