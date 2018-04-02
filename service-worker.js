if(navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    setInterval(function() {
        self.registration.pushManager.getSubscription().then(function(subscription) {
            var end = subscription.endpoint;
            fetch('/login/pushmessages/', {
              // В данном случае отправляются данные о подписчике, 
              // что позволит проверить или персонифицировать уведомление
              method: 'post',
              headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
              },
              body: 'url=' + end
            })
            .then(function(response) {
                console.log(subscription.endpoint);
              if (response.status !== 200) {
                console.log('Хьюстон, у нас проблемы с получением уведомлений: ' + response.status);
                throw new Error();
              }

              // Получаем ответ от сервера и проверяем его
              return response.json().then(function(data) { 
                if (data.error) { 
                  console.error('Сервер вернул ошибку: ', data.error);
                  throw new Error();  
                }  

                if (!data.newMessage) { 
                  console.log('Нет сообщений');
                  return;
                }

                var title = data.title;
                var message = data.message;
                var icon = data.icon;
                var notificationTag = data.tag;
                var custom_data = data.notification.data;

                return self.registration.showNotification(title, {
                  body: message,
                  icon: icon,
                  tag: notificationTag,
                  data: custom_data
                });
              });
            })
            .catch(function(err) {
              // В случае ошибки отображаем уведомление
              // со статичными данными
              console.error('Невозможно получить данные с сервера: ', err);
              return;
            });
        })
    }, 5000);
}

self.addEventListener('push', function(event) {
  // Так как пока невозможно передавать данные от push-сервера,
  // то информацию для уведомлений получаем с нашего сервера
  event.waitUntil(
    self.registration.pushManager.getSubscription().then(function(subscription) {        
        var end = subscription.endpoint;
        fetch('/login/pushmessages/', {
            // В данном случае отправляются данные о подписчике, 
            // что позволит проверить или персонифицировать уведомление
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: 'url=' + end
        })
        .then(function(response) {
            console.log(subscription.endpoint);
            if (response.status !== 200) {
              // TODO: Если сервер отдал неверные данные, 
              // нужно уведомить об этом пользователя или администратора
              console.log('Хьюстон, у нас проблемы с получением уведомлений: ' + response.status);
              throw new Error();
            }

            // Получаем ответ от сервера и проверяем его
            return response.json().then(function(data) { 
                if (data.error) { 
                  console.error('Сервер вернул ошибку: ', data.error);
                  throw new Error();  
                }  

                if (!data.newMessage) { 
                  console.log('Нет сообщений');
                  return;
                }

                var title = data.title;
                var message = data.message;
                var icon = data.icon;
                var notificationTag = data.tag;
                var custom_data = data.notification.data;

                return self.registration.showNotification(title, {
                  body: message,
                  icon: icon,
                  tag: notificationTag,
                  data: custom_data
                });
        });
      })
      .catch(function(err) {
        // В случае ошибки отображаем уведомление
        // со статичными данными
        console.error('Невозможно получить данные с сервера: ', err);
        return;
//        var title = 'Ошибочка вышла';
//        var message = 'Мы хотели сообщить вам что-то важное, но у нас всё сломалось.';
//        var icon = '/assets/img/pushmessage.png';
//        var notificationTag = 'notification-error';
//        return self.registration.showNotification(title, {
//            body: message,
//            icon: icon,
//            tag: notificationTag
//          });
      });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Пользователь кликнул по уведомлению: ', event.notification.tag);
  // Закрываем уведомление
  event.notification.close();

  // Смотрим, открыта ли вкладка с данной ссылкой
  // и фокусируемся или открываем ссылку в новой вкладке
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(clientList) {
      var url = event.notification.data;
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == url && 'focus' in client)
          return client.focus();
      }  
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

self.addEventListener('fetch', function(event) {});