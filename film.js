let nameH1;
let releaseDateSpan;
let directorSpan;
let producerSpan;
let filmsUl;
let planetsUl;
let charactersUl;
let openingCrawl;

const baseUrl = `https://swapi2.azurewebsites.net/api/films`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  releaseDateSpan = document.querySelector('span#release-date');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  openingCrawl = document.querySelector('#opening')
  filmsUl = document.querySelector('#films>ul');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function fetchHandler(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok) throw new Error(`Fetch failed with status - ${status}`, { cause: status });

    const isJson = (headers.get('content-type') || '').includes('application/json');
    const responseData = await (isJson ? response.json() : response.text());
    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    console.log(film)
    film.planets = await fetchPlanets(film)
    film.characters = await fetchCharacters(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/${film.id}/planets`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/${film.id}/characters`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their title
  titleH1.textContent = film?.title;
  producerSpan.textContent = film?.producer;
  directorSpan.textContent = film?.director;
  releaseDateSpan.textContent = film?.release_date;
  openingCrawl.textContent = film?.opening_crawl

  // const filmsLis = film?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  // filmsUl.innerHTML = filmsLis.join("");

  const charactersList = film?.characters?.sort((a,b) => a.name > b.name ? 1 : -1).map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersList.join("");

  const planetsList = film?.planets?.sort((a, b) => a.name > b.name ? 1 : -1).map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetsList.join("");
}
