const photosRequest = 'https://boiling-refuge-66454.herokuapp.com/images';

document.addEventListener("DOMContentLoaded", function(event) {

let firstRowImgs = document.querySelectorAll('.row-1 img');
let secondRowImgs = document.querySelectorAll('.row-2 img');

});

function sendRequest(method, url) {
  return fetch(url).then(response => {
    return response.json()
  })
}

const imgObject = sendRequest('GET', photosRequest)
  .then(pictures => {
    let firstRowImgs = document.querySelectorAll('.row-1 img');
    let secondRowImgs = document.querySelectorAll('.row-2 img');
    console.log(firstRowImgs)
    console.log(secondRowImgs)
    for (let i = 0; i < pictures.length; i++) {
    if (i < 3) {
      firstRowImgs[i].src = pictures[i].url
    } else {
      secondRowImgs[i - 3].src = pictures[i].url;
    }
  }
})
  .catch(err => console.log(err))


