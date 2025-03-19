const PHOTO_DESCRIPTIONS_COUNT = 25;

const DESCRIPTIONS = [
  'Утро началось с того, что кот решил, что я слишком долго сплю...',
  'Отвернись на секунду, а еды уже нет',
  'Я в чем-то виновата?',
  'Весь день спал, но устал за нас двоих.',
  'Пока я работаю, он просто смотрит.',
  'Коробка - новый дом для кота.',
  'Если у кота есть выбор между мягким пледом и клавиатурой, он выберет клавиатуру.',
  'Сама наглость',
  'Кот проснулся в 3 ночи...',
  'Задумчиво смотрит в стену',
  'Это был комплимент?',
  'Этот взгляд после ванны... я обречена.',
  'Открыть дверь? Нет, не смогу к сожалению... тут ситуация',
  'Пакет с кормом приманивает за тысячу километров',
  'Книга походу самое удобное место во всем доме)',
  'Люблю его',
  'Мирно спать в углу и не наводить хаос - как-то скучно... Перерыть шкаф - без проблем!',
  'Когда фотографиравоться вообще не хотелось',
  'И снова обделили с едой...',
  'Этот день он запомнит надолго.',
  'Сегодны мне плед не перепал, буду мерзнуть',
  'Самый милый и плюшевый',
  'Всегда приятно, когда дома кто-то встречает',
  'Гиперактивность в 3 ночи, ну кто ее не любит',
  'Даже чай в покое попить нельзя..)'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр', 'Иван', 'Дмитрий', 'Андрей', 'Сергей', 'Артем', 'Николай', 'Владимир', 'Павел', 'Егор',
  'Максим', 'Алексей', 'Виктор', 'Константин', 'Олег', 'Роман', 'Игорь', 'Василий', 'Григорий', 'Антон'
];

const SURNAMES = [
  'Иванов', 'Петров', 'Сидоров', 'Кузнецов', 'Смирнов', 'Васильев', 'Михайлов', 'Федоров', 'Ковалев','Новиков',
  'Алексеев', 'Макаров', 'Никитин', 'Захаров', 'Тимофеев', 'Орлов', 'Беляев', 'Соловьев', 'Жуков', 'Егоров'
];

const likesCount = {
  MIN: 15,
  MAX: 200
};

const commentsCount = {
  MIN: 0,
  MAX: 30
};

const avatarIndex = {
  MIN: 1,
  MAX: 6
};

let globalCommentId = 1;

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower - 1) + lower;
  return Math.floor(result);
};

const getArrayItem = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createPhotoComment = () =>
  function () {
    return {
      id: globalCommentId++,
      avatar: `img/avatar-${getRandomNumber(avatarIndex.MIN, avatarIndex.MAX)}.svg`,
      message: `${getArrayItem(MESSAGES)}`,
      name: `${getArrayItem(NAMES)} ${getArrayItem(SURNAMES)}`
    };
  };


const createPhotoDescription = () => {
  let photoId = 1;

  return function () {
    return {
      id: photoId++,
      url: `photos/${photoId - 1}.jpg`,
      description: DESCRIPTIONS[photoId - 2],
      likes: getRandomNumber(likesCount.MIN, likesCount.MAX),
      comments: Array.from({length: getRandomNumber(commentsCount.MIN, commentsCount.MAX)}, createPhotoComment())
    };
  };
};

export const photoDesciptions = Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription());


