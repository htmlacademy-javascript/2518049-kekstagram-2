import { handleMessageAppearance } from './utils';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/';

const dataErrorBlock = document.querySelector('#data-error').content.querySelector('.data-error');
const successBlock = document.querySelector('#success').content.querySelector('.success');
const filters = document.querySelector('.img-filters');

const getData = () => fetch(`${BASE_URL}data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
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
    handleMessageAppearance(successBlock);
  });

export {getData, sendData};
