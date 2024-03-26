import movies from './movies.js';

const input = document.querySelector('.input');
const resultList = document.querySelector('.result-list');
const button = document.querySelector('.button');
const movieShow = document.querySelector('.movie-show');

function validateInput(searchTerm) {
    return searchTerm.length >= 3;
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
        const ul = document.createElement('ul');

        limitedMatches.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.title;
            li.addEventListener('click', function() {
                input.value = movie.title;
                listMovies(movie.title); // When clicked, display the clicked movie
                resultList.innerHTML = ''; // Clear the resultList
            });
            ul.appendChild(li);
        });

        resultList.appendChild(ul);
        resultList.value = '';
    } else {
        resultList.innerHTML = '<li>Movie not found</li>';
    }
}


button.addEventListener('click', () => {
    const searchTerm = input.value.toLowerCase();
    const matches = searchMovies(searchTerm);
    if (matches.length > 0) {
        const movie = matches[0];
        const movieHTML = generateMovieHTML(movie);
        movieShow.innerHTML = movieHTML;
    } else {
        movieShow.innerHTML = ''; // Clear movieShow if no movie found
    }
    
});


function listMovies(searchTerm) {
    const matches = searchMovies(searchTerm.toLowerCase());
    displayMovieList(matches);
}


function generateMovieHTML(movie) {
    return `
        <div class="movie">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-details">
                <h2 class="movie-title">${movie.title}</h2>
                <div class="yearDuration">
                    <p class="movie-year">${movie.year}</p>
                    <p class="movie-duration">${movie.runningTime}</p>
                </div>
                <p class="movie-description">${movie.description}</p>
                <p class="movie-genre">${movie.genre.join('   ')}</p>
            </div>
        </div>
    `;
}

function handleInput() {
    const searchTerm = input.value.toLowerCase();
    if (validateInput(searchTerm)) {
        listMovies(searchTerm);
    } else {
        resultList.innerHTML = '';
    }
}




button.addEventListener('click', () => {
    handleInput();
    resultList.innerHTML = '';
});


input.addEventListener('input', handleInput);
