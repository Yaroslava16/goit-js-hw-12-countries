import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, success, error } from '@pnotify/core';

function manyCoincidences() {
  info({
    text: 'Too many matches found. Please enter a more specific query!',
    sticker: false,
  });
}
function successfulSearch() {
  success({
    text: 'Country found!',
    sticker: false,
  });
}
const catchError = function () {
  error({
    text: 'You must enter query parameters!',
    sticker: false,
  });
};
export default { manyCoincidences, successfulSearch, catchError };
