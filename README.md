# 06-Weather-Dashboard

This application allows a user to search for a specific city and view the current and 5 day forcast for that city using the OpenWeather API. Searched cities are saved in recent searches for easy access.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

User Story:

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

Acceptance Criteria:

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

### Screenshot

-   Weather App Preview [Weather](./assets/images/Screenshot.JPG?raw=true 'Screenshot')

### Links

-   Live Site URL: [Github](https://isayahdurst.github.io/06-weather-dashboard)

## My process

When I started the project, I began working with the OpenWeather API and making some calls in PostMan to get an understanding of how the data would be structured when it was returned to me. This proved helpful, and by mapping out the structure beforehand I was able to save a lot of time and needless API calls. After that, I began working on the HTML and CSS for the application and envisioned some very reactive features, such as dynamic background changes based on the time and weather conditions. Ultimately I wasn't able to add these features as a group-project I was working on simultaneously severely limited my time to work on this application, but if I were to return I would love to add the finishing touches on that. After getting the design close to how I wanted, the next step was to work on the JavaScript and make sure to manipulate the DOM according to the data that the API was returning. That was exciting and simple enough to achieve.

### Built with

-   Semantic HTML5 markup
-   CSS
-   JavaScript
-   Luxon

### What I learned

This project taught me how to correctly use Fetch API, along with asyncronous functions, to achieve requesting and manipulating data from a third party.

### Continued development

If I were to continue development, I would certainly improve the UI of this application and add the dynamic backgrounds which were aforementioned.

## Author

-   Github - [@isayahdurst](https://www.github.com/isayahdurst)
-   Twitter - [@isayahdurst](https://www.twitter.com/isayahdurst)

## Acknowledgments
