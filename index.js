async function fetchTVSeries(type) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA3Yzc2NzgwMzNkYzY3MjRhOTc4NmFmNzE2YjQzOSIsInN1YiI6IjY0N2M0NDE0MTc0OTczMDBkZTY2YzJiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TOu08ijqtkF_tDatViWnT6MduA35RhYQX7bfEmUySc0'
        }
    };

    const url = `https://api.themoviedb.org/3/tv/${type}?language=en-US&page=1`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);   
        return []; // Return an empty array in case of an error
    }
}

async function displayTVSeries(seriesType) {
    try {
        const series = await fetchTVSeries(seriesType);
        const tvSeriesCardsContainer = document.getElementById('tvSeriesCards');
        // Clear previous cards
        while (tvSeriesCardsContainer.firstChild) {
            tvSeriesCardsContainer.removeChild(tvSeriesCardsContainer.firstChild);
        }
        series.forEach(seriesItem => {
            const card = createTVSeriesCard(seriesItem);
            tvSeriesCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

function createTVSeriesCard(series) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
    img.alt = series.name;
    card.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    card.appendChild(cardContent);

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = series.name;
    cardContent.appendChild(title);

    const overview = document.createElement('p');
    overview.classList.add('card-description');
    overview.textContent = series.overview;
    cardContent.appendChild(overview);

    return card;
}

// Get dropdown elements
const dropdownSelect = document.querySelector('.dropdown-select');
const dropdownOptions = document.querySelector('.dropdown-options');

// Toggle dropdown options visibility
dropdownSelect.addEventListener('click', function() {
    dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
});

// Handle option selection
dropdownOptions.addEventListener('click', function(event) {
    const selectedOption = event.target.closest('.dropdown-option');
    if (selectedOption) {
        const selectedValue = selectedOption.getAttribute('data-value');
        dropdownSelect.textContent = selectedOption.textContent;
        // Display TV series based on the selected value
        displayTVSeries(selectedValue);
    }
    dropdownOptions.style.display = 'none';
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        dropdownOptions.style.display = 'none';
    }
});

// Initial display of popular TV series
displayTVSeries('popular');
