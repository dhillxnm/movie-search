'use strict';

/*---------------------------------------- */
/*-------------Imported files------------- */
/*---------------------------------------- */
import movies from './movies.js';
import { select, listen, getElement, selectAll, create } from './utils.js';

/*---------------------------------------- */
/*-------------------DOM------------------ */
/*---------------------------------------- */

const input = select('.input');
const resultList = select('.result-list');
const button = select('.button');
const movieShow = select('.movie-show');

/*---------------------------------------- */
/*--------------Listing Movies------------ */
/*---------------------------------------- */

function validateInput(searchTerm) {
    return searchTerm.length >= 3;
}

function handleInput() {
    const searchTerm = input.value.toLowerCase();
    if (validateInput(searchTerm)) {
        listMovies(searchTerm);
    } else {
        resultList.innerHTML = '';
    }
}

function searchMovies(searchTerm) {
    return movies.filter(movie => {
        const title = movie.title.toLowerCase();
        return title.includes(searchTerm);
    });
}

function displayMovieList(matches) {
    resultList.innerHTML = '';
    if (matches.length > 0) {
        const limitedMatches = matches.slice(0, 5);
        const ul = create('ul');
        limitedMatches.forEach(movie => {
            const li = create('li');
            li.textContent = movie.title;
            listen('click', li, function() {
                input.value = movie.title;
                listMovies(movie.title);
                resultList.innerHTML = '';
            });
            ul.appendChild(li);
        });
        resultList.appendChild(ul);
        resultList.value = '';
    } else {
        resultList.innerHTML = '<li class="not-found">Movie not found</li>';
    }
}

function displayFirstMatch() {
    const searchTerm = input.value.toLowerCase();
    const matches = searchMovies(searchTerm);
    if (matches.length > 0) {
        const movie = matches[0];
        const movieHTML = generateMovieHTML(movie);
        movieShow.innerHTML = movieHTML;
    } else {
        movieShow.innerHTML = '';
    }
}

function listMovies(searchTerm) {
    const matches = searchMovies(searchTerm.toLowerCase());
    displayMovieList(matches);
}

/*---------------------------------------- */
/*----------------fetch movie------------- */
/*---------------------------------------- */

function generateMovieHTML(movieFound) {
    let genres = '';
    movieFound.genre.forEach(singleGenre => {
        genres += `<span class="genre" style="background-color: #24252D;">${singleGenre}</span>`;
    });
    const yearDurationHTML = `
        <div class="yearDuration">
            <div class="green-dot"></div>
            <p class="movie-year">${movieFound.year}</p>
            <p class="movie-duration">${movieFound.runningTime}</p>
        </div>
    `;
    return `
        <div class="movie">
            <img src="${movieFound.poster}" alt="${movieFound.title}" class="movie-poster">
            <div class="movie-details">
                <h2 class="movie-title">${movieFound.title}</h2>
                ${yearDurationHTML}
                <p class="movie-description">${movieFound.description}</p>
                <div class="movie-genre">${genres}</div>
            </div>
        </div>
    `;
}

/*---------------------------------------- */
/*----------------Event lis.-------------- */
/*---------------------------------------- */

listen('input', input, handleInput);
listen('click', button, displayFirstMatch);
listen('click', button, () => {
    handleInput();
    resultList.innerHTML = '';
});
