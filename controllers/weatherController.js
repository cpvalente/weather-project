// get API key
const { API_KEYS } = require('../api/credentials');

// Keep all in memory
let projectData = [];

// aux
const eventDef = {
  date: 'datae',
  weather: 'temperature',
  content: 'veryobject',
};

exports.getAll = async = (req, res) => {
  res.json(projectData);
  console.log('getall', projectData);
};

exports.getLast = (req, res) => {
  const last = projectData[projectData.length - 1];
  console.log('getlast', last);

  res.json(last);
};

exports.postEntry = (req, res) => {
  if (req.body == null) {
    res.status(400).send('Request body missing or invalid');
    return null;
  }

  // we calculate date in server side
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let date = new Date();
  let d = date.toLocaleString('en-GB', { timeZone: 'UTC' }, options);

  // ensure format
  const newEvent = {
    date: d,
    weather: req.body.weather,
    content: req.body.content,
  };

  // push to db
  projectData.push(newEvent);

  // Reply with new event
  res.status(201).json(newEvent);
};
