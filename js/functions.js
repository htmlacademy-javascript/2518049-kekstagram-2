function stringLengthValid(string, maxLength) {
  return string.length <= maxLength;
}


function isPalindrome(string) {
  const normalizedString = string.toLowerCase().trim().replaceAll(' ', '');

  for(let i = 0; i <= Math.ceil(normalizedString.length / 2); i++) {
    return normalizedString[i] === normalizedString[normalizedString.length - 1 - i];
  }
}


function excerptNumbers(receivedValue) {
  const string = receivedValue.toString();
  let numbers = '';

  for(let i = 0; i <= string.length - 1; i++) {
    if(!Number.isNaN(parseInt(string[i], 10))) {
      numbers = numbers + string[i];
    }
  }

  if(Number.isNaN(parseInt(numbers, 10))) {
    return NaN;
  }
  return numbers;
}


stringLengthValid('проверяемая строка', 20);
stringLengthValid('проверяемая строка', 18);
stringLengthValid('проверяемая строка', 10);
isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('Кекс');
excerptNumbers('1 кефир, 0.5 батона');
excerptNumbers('а я томат');
excerptNumbers(-1.5);
