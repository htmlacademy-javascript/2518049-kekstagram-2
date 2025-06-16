import { showMessage } from './utils';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const dataErrorBlock = document.querySelector('#data-error').content.querySelector('.data-error');
const successBlock = document.querySelector('#success').content.querySelector('.success');
const errorBlock = document.querySelector('#error').content.querySelector('.error');


const getData = () => fetch(`${BASE_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
    return response.json();
  })
  .catch(() => {
    document.body.append(dataErrorBlock);
    setTimeout(() => {
      dataErrorBlock.remove();
    }, 5000);
  });


const sendData = (body) => fetch(`${BASE_URL}`, {method: 'POST', body})
  .then((response) => {
    if(!response.ok) {
      throw new Error();
    }
    showMessage(successBlock);
  })
  .catch(() => {
    showMessage(errorBlock);
    throw new Error();
  });

export {getData, sendData};
