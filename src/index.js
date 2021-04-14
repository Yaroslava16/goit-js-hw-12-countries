import './styles.css';
import API from './js/api-service';
import getRefs from './js/get-refs';
import * as _ from 'lodash';
import countryCardTpl from './templates/country-data.hbs';

const refs = getRefs();

refs.input.addEventListener('input', _.debounce(onInputClick, 500));

function onInputClick(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => (refs.input.value = ''));

  // if (refs.input.value === { name }) {
  //   fetchCountries(searchQuery);
  // }
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.cardConteiner.innerHTML = markup;
}

function onFetchError(error) {
  alert('Такой страны не существует :(');
}
