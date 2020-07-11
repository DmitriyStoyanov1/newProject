const photosRequest = 'https://boiling-refuge-66454.herokuapp.com/images';

document.addEventListener("DOMContentLoaded", function (event) {

  let firstRowImgs = document.querySelectorAll('.row-1 img');
  let secondRowImgs = document.querySelectorAll('.row-2 img');

  function sendRequest(method, url) {
    return fetch(url).then(response => {
      return response.json();
    })
  }

  const imgObject = sendRequest('GET', photosRequest)
    .then(pictures => {
      let firstRowImgs = document.querySelectorAll('.row-1 img');
      let secondRowImgs = document.querySelectorAll('.row-2 img');

      for (let i = 0; i < pictures.length; i++) {
        if (i < 3) {
          firstRowImgs[i].src = pictures[i].url;
          firstRowImgs[i].dataset.id = pictures[i].id;
        } else {
          secondRowImgs[i - 3].src = pictures[i].url;
          secondRowImgs[i - 3].dataset.id = pictures[i].id;
        }
      }
      console.log(pictures)
    })
    .catch(err => console.log(err));

  const bigImgObject = function (target, currentRequest) {
    if (target.tagName === 'IMG') {
      const modal = document.querySelector('.modal');
      modal.style.display = 'block';
      const bigPicRequest = sendRequest('GET', currentRequest)
        .then(picture => {
          bigPic.src = picture.url;
          bigPic.dataset.id = picture.id;
          console.log(picture)

          const dateSpan = document.querySelector('.modal-comment-container');
          if (picture.comments[0].text && picture.comments[0].date) {
            let date = new Date(picture.comments[0].date);
            console.log(date)
            dateSpan.innerHTML = `<div class="comment"><span>${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}</span></div>`;
            dateSpan.innerHTML += `<div class="comment"><p>${picture.comments[0].text}</p></div>`;
          }
        })
        .catch(err => console.log(err));
    }
  }

  let gallery = document.querySelector('.gallery');
  let bigPic = document.querySelector('.modal-content-container img');
  let modal = document.querySelector('.modal');

  gallery.addEventListener('click', event => {
    let target = event.target;
    let currentRequest = `https://boiling-refuge-66454.herokuapp.com/images/${target.dataset.id}`;
    console.log(currentRequest)
    bigImgObject(target, currentRequest);
  })

  const modalClose = document.querySelector('.modal-window a');

  modalClose.addEventListener('click', event => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';

    const dateSpan = document.querySelector('.modal-comment-container');
    dateSpan.innerHTML = '';
    bigPic.src = '';
    event.preventDefault();
  })

  const formSubmit = document.querySelector('form');

  formSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const bigPic = document.querySelector('.modal-content-container img');
    const usernameField = document.querySelector('.modal-content-container input[name="username"]');
    const commentField = document.querySelector('.modal-content-container input[name="comment"]');

    const data = {
      name: usernameField.value,
      comment: commentField.value
    }

    const currentRequest = `https://boiling-refuge-66454.herokuapp.com/images/${bigPic.dataset.id}/comments`;
    let response = fetch(currentRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log(response);
    console.log(currentRequest);
    usernameField.value = '';
    commentField.value = '';
  })


});

let date = new Date(1578054737927);
console.log(date.getFullYear())
console.log(date.getMonth() + 1)
console.log(date.getDate())
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