import { getFavorites } from "./localStorage.js";

let filmsUl;
let charactersUl;

addEventListener('DOMContentLoaded', () => {
    filmsUl = document.querySelector('#films>ul')
    const films = getFavorites('film')
    charactersUl = document.querySelector('#characters>ul')
    const characters = getFavorites('characters')
    renderFavorites(films, characters, [])
})

const renderFavorites = (films, characters, planets) => {
const filmsLis = films?.sort((a, b) => a.title > b.title ? 1 : -1).map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
filmsUl.innerHTML = filmsLis.join("");
}