'use strict';

const DateTime = luxon.DateTime;

const APIKey = '26adccd8ee2f8d64c1eff0ffe88e4fad';
const openWeatherImgURL = 'https://openweathermap.org/img/wn/';

const searchBar = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const searchResults = document.querySelector('.search-results');

/* Current Day Summary Items */
const currentCity = document.querySelector('.city-name');
const currentTemp = document.querySelector('#summary-temp-val');
const currentPrecip = document.querySelector('.summary-precip-val');
const currentWind = document.querySelector('.summary-wind-val');
const currentHumidity = document.querySelector('.summary-humidity-val');
const currentCondition = document.querySelector('#summary-condition-img');
const currentDay = document.querySelector('.city-label-weekday');

/* Forecast items */
const forecastList = document.querySelector('#forecast-list');

/* Modal Window Elements */
const modalWindow = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-title');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');

const hideModal = function () {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
    searchResults.innerHTML = '';
};

const showModal = function () {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const formatSearch = function (search) {
    const newArr = search.split(',');
    const formattedArr = newArr.map((element) => {
        element = element.trim();
        const tempElement = [...element];
        tempElement.forEach(function (value, index) {
            if (value === ' ') tempElement[index] = '-';
        });
        element = tempElement.join('');
        return element;
    });
    const formattedString = formattedArr.join(',');
    return formattedString;
};

const savedCities = JSON.parse(localStorage.getItem('recentSearches')) || {};

const getWeatherData = async function (cityName, lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${APIKey}`
    );
    const weatherData = await response.json();
    sections[0].classList.remove('hidden');
    sections[1].classList.remove('hidden');
    console.log(weatherData);
    searchBar.value = '';
    hideModal();
    currentCity.textContent = cityName;
    currentTemp.innerHTML = `${Math.round(
        weatherData.daily[0].temp.day
    )} &#8457`;
    if (!isNaN(weatherData.daily[0].rain)) {
        currentPrecip.textContent = `${(
            weatherData.daily[0].rain / 25.4
        ).toFixed(2)}"`;
    } else {
        currentPrecip.textContent = '0"';
    }

    currentWind.textContent = `${weatherData.daily[0].wind_speed} MPH`;
    currentHumidity.textContent = `${weatherData.daily[0].humidity}%`;
    currentCondition.src = `${openWeatherImgURL}${weatherData.daily[0].weather[0].icon}@2x.png`;
    currentCondition.alt = `${weatherData.daily[0].weather[0].description}`;
    currentCondition.title = `${weatherData.daily[0].weather[0].description}`;
    currentDay.textContent = getWeekday(weatherData.daily[0].dt, {
        zone: weatherData.timezone,
    });

    renderForcast(weatherData.daily, weatherData.timezone);
    savedCities[cityName] = weatherData;
    localStorage.setItem('recentSearches', JSON.stringify(savedCities));
    renderRecentSearches();
};

const renderForcast = function (weatherArray, zone) {
    forecastList.innerHTML = '';

    weatherArray.forEach(function (value, index) {
        if (index != 0 && index != 7) {
            const day = document.createElement('li');
            const wrapper = document.createElement('div');
            wrapper.classList.add('card-wrapper');

            // SETS THE DAY
            const time = document.createElement('div');
            time.classList.add('time');
            time.classList.add('large');
            time.textContent = `${getWeekday(value.dt, { zone: zone })}`;

            // ADDS WEATHER IMAGE, ALT, AND TITLE (tipbox)
            const condition = document.createElement('div');
            condition.classList.add('time-period-condition');
            const image = document.createElement('img');
            image.src = `${openWeatherImgURL}${value.weather[0].icon}.png`;
            image.alt, (image.title = value.weather[0].description);
            condition.appendChild(image);

            // ADDS TEMPERATURE
            const tempIcon = document.createElement('i');
            tempIcon.classList.add('fa-solid', 'fa-temperature-three-quarters');
            const temp = document.createElement('div');
            temp.append(tempIcon);
            temp.innerHTML += ` ${Math.round(value.temp.day)} F`;

            // ADDS RAIN
            const precipitation = document.createElement('div');
            const rainIcon = document.createElement('i');
            rainIcon.classList.add('fa-regular', 'fa-droplet');
            precipitation.append(rainIcon);
            if (!isNaN(value.rain)) {
                precipitation.innerHTML += ` ${(value.rain / 25.4).toFixed(
                    2
                )}"`;
            } else {
                precipitation.innerHTML += ' 0"';
            }

            // ADDS WIND SPEED
            const windIcon = document.createElement('i');
            windIcon.classList.add('fa-solid', 'fa-wind');
            const windSpeed = document.createElement('div');
            windSpeed.append(windIcon);
            windSpeed.innerHTML += ` ${value.wind_speed} MPH`;

            // ADDS HUMIDITY
            const humidityIcon = document.createElement('i');
            humidityIcon.classList.add('fa-regular', 'fa-droplet-percent');
            const humidity = document.createElement('div');
            humidity.append(humidityIcon);
            humidity.innerHTML += ` ${value.humidity} %`;

            forecastList.appendChild(day);
            day.appendChild(wrapper);
            const wrapperChildren = [
                time,
                condition,
                temp,
                precipitation,
                windSpeed,
                humidity,
            ];

            wrapperChildren.forEach(function (value) {
                wrapper.appendChild(value);
            });
        }
    });
};

const getWeekday = function (timeInSeconds, zone) {
    const weekdays = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday',
    };
    const time = DateTime.fromSeconds(timeInSeconds, zone);
    const timeISO = time.toISO();
    const weekday = time.weekday;
    return weekdays[weekday];
};

const createCitiesList = function (cities) {
    if (cities.length) {
        modalTitle.textContent = `Please select a city:`;
        modalTitle.classList.remove('error');

        cities.forEach(function (value, index) {
            const result = document.createElement('li');
            result.textContent = `${value.name}, ${value.state}, ${value.country}`;
            result.setAttribute('data-lat', value.lat);
            result.setAttribute('data-lon', value.lon);
            searchResults.appendChild(result);
        });
    } else {
        modalTitle.textContent = `Sorry, no results found. Please refine your search and try again.`;
        modalTitle.classList.add('error');
    }
};

const getCities = async function (search, limit, APIKey) {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${limit}&appid=${APIKey}`
    );
    const cityArray = await response.json();
    showModal();
    createCitiesList(cityArray);
};

/* Event Listeners */

searchBtn.addEventListener('click', function () {
    getCities(formatSearch(searchBar.value), 5, APIKey);
});

closeModalBtn.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

searchResults.addEventListener('click', function (event) {
    const target = event.target;
    if (event.target.tagName.toLowerCase() === 'li') {
        const lon = target.getAttribute('data-lon');
        const lat = target.getAttribute('data-lat');
        const cityName = target.textContent;
        modalWindow.classList.add('hidden');
        getWeatherData(cityName, lat, lon);
        // Summon WeatherData with correct LAT LON values
    }
});

// Set Background Image:

console.log(DateTime.now());

const sections = document.querySelectorAll('.weather-summary');

sections[0].classList.add('hidden');
sections[1].classList.add('hidden');

const renderRecentSearches = function () {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    const recentSearchesList = document.querySelector('.recent-searches-list');
    recentSearchesList.innerHTML = '';
    for (const city of Object.keys(recentSearches)) {
        const cityLI = document.createElement('li');
        cityLI.classList.add('recent-city');
        const cityLIName = document.createElement('span');
        cityLI.setAttribute('data-city', city);
        cityLI.appendChild(cityLIName);
        cityLIName.textContent = city;
        recentSearchesList.appendChild(cityLI);
    }

    const cityLI = document.querySelectorAll('.recent-city');

    cityLI.forEach(function (city) {
        city.addEventListener('click', function (event) {
            console.log('been clicked');
            const cityName = event.currentTarget.getAttribute('data-city');
            const cities = JSON.parse(localStorage.getItem('recentSearches'));
            const { lat, lon } = cities[cityName];
            getWeatherData(cityName, lat, lon);
        });
    });
};

renderRecentSearches();

/* const cityLI = document.querySelectorAll(".recent-city");

cityLI.forEach(function (city) {
  city.addEventListener("click", function (event) {
    console.log("been clicked");
    const cityName = event.currentTarget.getAttribute("data-city");
    const cities = JSON.parse(localStorage.getItem("recentSearches"));
    const { lat, lon } = cities[cityName];
    getWeatherData(cityName, lat, lon);
  });
}); */

const showLS = function () {
    console.log(
        Object.keys(JSON.parse(localStorage.getItem('recentSearches')))
    );
};

showLS();
