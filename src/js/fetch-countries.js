export default fetchCountries('https://restcountries.eu/rest/v2/name/{name}')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  });
