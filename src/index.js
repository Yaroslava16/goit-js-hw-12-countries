import './styles.css';
import API from './js/api-service';
import getRefs from './js/get-refs';
import notifications from './js/notifications';
import * as _ from 'lodash';
import countryCardTpl from './templates/country-data.hbs';
import countriesList from './templates/many-country.hbs';

const refs = getRefs();

refs.input.addEventListener('input', _.debounce(onInputClick, 500));

function onInputClick(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        clearListCountries();
        notifications.manyCoincidences();
      } else if (data.length >= 2 && data.length <= 10) {
        renderCountriesList(data);
      } else {
        notifications.successfulSearch();
        renderCountry(data);
      }
    })
    .catch(() => {
      notifications.catchError();
      clearListCountries();
    });
}

function renderCountriesList(val) {
  refs.countryConteiner.innerHTML = countriesList(val);
}

function renderCountry(val) {
  refs.countryConteiner.innerHTML = countryCardTpl(val);
}

function clearListCountries() {
  refs.countryConteiner.innerHTML = '';
}
