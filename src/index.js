import './styles.css';
import API from './js/api-service';
import getRefs from './js/get-refs';
import * as _ from 'lodash';
import countryCardTpl from './templates/country-data.hbs';
import countriesList from './templates/many-country.hbs';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const refs = getRefs();

refs.input.addEventListener('input', _.debounce(onInputClick, 500));

function onInputClick(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        alert({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.status === 404) {
        alert({
          text:
            'No country has been found. Please enter a more specific query!',
        });
      } else if (data.length === 1) {
        renderCountryCard(data, countryCardTpl);
      } else if (data.length <= 10) {
        renderCountryCard(data, countriesList);
      }
    })
    .catch(Error => {
      Error({
        text: 'You must enter query parameters!',
      });
      console.log(Error);
    })
    .finally(() => clearListCountries());
}

function renderCountryCard(countries, template) {
  const markup = countries.map(country => template(country)).join();
  refs.countryList.insertAdjacentHTML('afterbegin', markup);
}

function clearListCountries() {
  refs.countryList.innerHTML = '';
}
