// функция которая делает один запрос по определенному урлу
// url - ссылка по которой отправить запрос
// config - конфиг запроса (заголовки, тип запроса, какие-то данные и т.д.)
// через = можно указать аргументы по умолчанию
function sendRequest(url, config = {}) {
  // это дефолтный конфиг, который будет объединен с кастомным конфигом приходящим в функцию
  const fetchConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // возвращаем fetch т.е.  промис
  // через ... объединяем два конфига в один
  return fetch(url, { ...fetchConfig, ...config })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return new Error('Ошибка запроса')
    })
}

// пример использования sendRequest
sendRequest('https://boiling-refuge-66454.herokuapp.com/images', { method: 'GET' })

// пример получения списка фото
const getAllPictures = sendRequest('https://boiling-refuge-66454.herokuapp.com/images', { method: 'GET' })
  .then(pictures => {
    return pictures;
  })

// вот так тебе будут доступны фото
getAllPictures.then(pictures => {
  // тут уже всякие циклы для рендеринга фоточек в разметку
})

// пример на async await
(async () => {
  const pictures = await sendRequest('https://boiling-refuge-66454.herokuapp.com/images', { method: 'GET' });

  for(let i = 0; i < pictures.length; i++) {
    // в pictures будет массив картинок
  }
})()
