const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const dataErrorBlock = document.querySelector('#data-error').content.querySelector('.data-error');

const errorBlock = document.querySelector('#error').content.querySelector('.error');

const getData = (onSuccess) => fetch(`${BASE_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((photos) => onSuccess(photos))
  .catch(() => {
    document.body.append(dataErrorBlock);
    setTimeout(() => {
      dataErrorBlock.remove();
    }, 5000);
  });


const sendData = (body) => fetch(`${BASE_URL}`, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-type': 'multipart/form-data'
  },
  body
})
  .then((response) => {
    if(!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    document.body.append(errorBlock);
  });

export {getData, sendData};
