const photosRequest = 'https://boiling-refuge-66454.herokuapp.com/images';

document.addEventListener("DOMContentLoaded", function (event) {

  const gallery = document.querySelector('.gallery');
  const galleryPreloader = document.querySelector('.gallery .preloader');

  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  const modalImage = document.querySelector('.modal img');
  const modalComments = document.querySelector('.modal .modal-comments');
  const modalClose = document.querySelector('.modal-window a');

  const formSubmit = document.querySelector('form');

  function sendRequest(method, url) {
    return fetch(url).then(response => {
      return response.json();
    })
  }

  function toggleModal() {
    if(modal.style.display === 'none') {
      body.classList.add('modal-is-open');
      modal.style.display = 'flex';
    } else {
      body.classList.remove('modal-is-open');
      modal.style.display = 'none';
    }
  }

  function renderModalComments(comment) {
    let modalCommentsContent = modalComments.innerHTML;

    const currentDate = new Date()
    const date = currentDate.toISOString().slice(0,10).replace(/-/g,".").split('.').reverse().join('.');

    const newComment = `
      <div class="comment">
        <div class="date">${date}</div>
        <p class="text">${comment.comment}</p>
      </div>
    `

    modalCommentsContent += newComment

    modalComments.innerHTML = modalCommentsContent
  }

  

  // Грузим галерею с картинками
  sendRequest('GET', photosRequest)
    .then(pictures => {
      const imagesMarkup = pictures.reduce((total, current) => {
        return total += `<img src="${current.url}" data-id="${current.id}" data-toggle="modal" data-target="#exampleModal" />`
      }, '')

      gallery.innerHTML = imagesMarkup

      gallery.classList.remove('loading')
      galleryPreloader.classList.add('hidden')
    })
    .catch(err => console.log(err));

  // Грузим отдельную картинку и комментарии к ней
  const loadSingleImage = function (imageId) {
    const imageEndpoint = `https://boiling-refuge-66454.herokuapp.com/images/${imageId}`;

    sendRequest('GET', imageEndpoint)
        .then(picture => {
          modalImage.src = picture.url
          modalImage.dataset.id = picture.id

          // const dateSpan = document.querySelector('.modal-comment-container');
          // if (picture.comments[0].text && picture.comments[0].date) {
          //   let date = new Date(picture.comments[0].date);
          //   console.log(date)
          //   dateSpan.innerHTML = `<div class="comment"><span>${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}</span></div>`;
          //   dateSpan.innerHTML += `<div class="comment"><p>${picture.comments[0].text}</p></div>`;
          // }
        })
        .catch(err => console.log(err));
  }

  gallery.addEventListener('click', event => {
    if(event.target.tagName !== 'IMG') {
      return;
    }

    const imageId = event.target.dataset.id

    toggleModal()
    loadSingleImage(imageId);
  })

  modalClose.addEventListener('click', event => {
    toggleModal()


    modalImage.src = './placeholder.png'
    // const dateSpan = document.querySelector('.modal-comment-container');
    // dateSpan.innerHTML = '';
    // bigPic.src = '';
    event.preventDefault();
  })

  formSubmit.addEventListener('submit', event => {
    event.preventDefault();

    const usernameField = document.querySelector('.modal-content input[name="username"]');
    const commentField = document.querySelector('.modal-content input[name="comment"]');

    const commentData = {
      name: usernameField.value,
      comment: commentField.value
    }

    const currentRequest = `https://boiling-refuge-66454.herokuapp.com/images/${modalImage.dataset.id}/comments`;

    const response = fetch(currentRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData)
    });

    response.then(() => {
      // Рендерим комментари
      renderModalComments(commentData)
      
      // Сбрасываем значение формы
      usernameField.value = '';
      commentField.value = '';
    })
  })
});

// let date = new Date(1578054737927);
// console.log(date.getFullYear())
// console.log(date.getMonth() + 1)
// console.log(date.getDate())
/* console.log("hello");

const app = document.querySelector("#app");
const response = {
  id: 240,
  url: "https://picsum.photos/id/240/600/400",
  comments: [
    { id: 154, text: "Мне нравится", date: 1578054737927 },
    { id: 155, text: "Очень круто!", date: 1578054737927 },
    { id: 156, text: "Еще коммент!", date: 1578054737927 }
  ]
};

console.log(app);

const commentsHTML = response.comments.reduce((html, comment) => {
  html += `<div class="comment">${comment.text}</div>`;
  return html;
}, "");

app.innerHTML = `<img src="${response.url}" />`;
app.innerHTML += commentsHTML; */