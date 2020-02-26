const api = {
  key: '91c9d9b1c2fdea1fe1e23b6c3dcffceb',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
};
//Variables
const searchBox = document.querySelector('.search-box');

//Functions
const dateBuilder = d => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};
const displayResults = weather => {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min.toFixed(
    0,
  )}°c / ${weather.main.temp_max.toFixed(0)}°c`;
};

const getResults = async query => {
  const data = await (
    await fetch(
      `${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`,
    )
  ).json();
  displayResults(data);
};

const setQuery = e => {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
};

//Event Listeners
searchBox.addEventListener('keypress', setQuery);
