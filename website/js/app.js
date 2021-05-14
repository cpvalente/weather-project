const HOSTNAME = 'http://localhost';
const URL = `${HOSTNAME}:${3000}`;
const API_KEYS = '9ce05789365f2a86b0f4730356dc215e';

/******************** HANDLE API ********************/

/**
 * @description Gets all entry from server
 * @param none
 * @returns {array} Array of objects
 */
const getAll = async () => {
  const res = await fetch(URL + '/all');
  try {
    return await res.json();
  } catch (error) {
    console.log('error');
  }
};

/**
 * @description Gets last entry from server
 * @param none
 * @returns {object} Last entry
 */
const getLast = async () => {
  const res = await fetch(URL + '/last');
  try {
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Post entry to server
 * @param {object} Object to insert
 * @returns {object} Inserted object
 */
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
/**
 * @description Get weather data for a zip code
 * @param {string} Zip code
 * @returns {object} Weather data
 */
const getWeatherAtZip = async (zip) => {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEYS}&units=metric`
  );
  try {
    return await res.json();
  } catch (error) {
    console.log('error');
  }
};

/*********************** HMTL ***********************/

/**
 * @description Cheks for existing entries and call UI update
 * @param none
 * @returns none
 */
const init = async () => {
  let data = await getLast();
  if (data == null) return;

  updateUI(data);
};

/**
 * @description Update UI with given object
 * @param {object} Object to show
 * @returns none
 */
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

/**
 * @description Gets data from html and calls to add to server
 * @param {object} event handler
 * @returns none
 */
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
