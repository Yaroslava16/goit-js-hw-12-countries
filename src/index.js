import './styles.css';
// import fetchCountries from './js/fetch-countries';
import * as _ from 'lodash';

const input = document.querySelector('#country-name-input');

input.addEventListener('input', _.debounce(onInputClick, 500));

function onInputClick(e) {
  console.log(input.value);
}
