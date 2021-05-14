// const config = require('../config.json');
const HOSTNAME = 'http://localhost';
const URL = `${HOSTNAME}:${3000}`;

/******************** HANDLE API ********************/

// get all entries from server
const getAll = async () => {
  const res = await fetch(URL + '/all');
  try {
    return await res.json();
  } catch (error) {
    console.log('error');
  }
};

// get last entry from server
const getLast = async () => {
  const res = await fetch(URL + '/last');
  try {
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// post entry to server
const postEntry = async (data) => {
  const res = await fetch('http://localhost:3000/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    return await res.json();
  } catch (error) {}
};

/**************** HANDLE SERVER API *****************/
const getWeatherAtZip = async (zip) => {
  API_KEYS = '9ce05789365f2a86b0f4730356dc215e';
  let thiszip = 65248; // const for now

  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${thiszip}&appid=${API_KEYS}`
  );
  try {
    return await res.json();
  } catch (error) {
    console.log('error');
  }
};

/*********************** HMTL ***********************/

// init script, try to popylate if info is availabe
const init = async () => {
  let data = await getLast();
  if (data == null) return;

  updateUI(data);
};

// update UI elements
const updateUI = (entry) => {
  // get elements to update
  const dateDiv = document.getElementById('date');
  const tempDiv = document.getElementById('temp');
  const contentDiv = document.getElementById('content');

  // update elements
  dateDiv.innerText = entry.date || '';
  tempDiv.innerText = `${entry.weather.main.temp}°` || '';
  contentDiv.innerText = entry.content || '';
};

const generateHandler = async (e) => {
  // get data from html
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  // get temperature from API
  let weatherData = await getWeatherAtZip(zipCode);

  const newEntry = {
    content: content,
    weather: weatherData,
  };

  // post new data and update UI
  let res = await postEntry(newEntry);

  // fetch new data (meet rubric requirements)
  let data = await getLast();

  updateUI(data);
};

/*********************** MAIN ***********************/

// form submit listener
document.getElementById('generate').addEventListener('click', generateHandler);

// maybe server is running with info
document.addEventListener('DOMContentLoaded', init);
