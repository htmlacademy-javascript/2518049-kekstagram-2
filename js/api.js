import { handleMessageAppearance } from './utils';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const ERROR_REMOVAL_DELAY = 5000;

const dataErrorBlock = document.querySelector('#data-error').content.querySelector('.data-error');
const successBlock = document.querySelector('#success').content.querySelector('.success');
const filters = document.querySelector('.img-filters');

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
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
    }, ERROR_REMOVAL_DELAY);
  });

const sendData = (body) => fetch(`${BASE_URL}${Route.SEND_DATA}`, {method: 'POST', body})
  .then((response) => {
    if(!response.ok) {
      throw new Error();
    }
    handleMessageAppearance(successBlock);
  });

export {getData, sendData};
