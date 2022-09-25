const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/weather?q=",
  units: "metric"
}

const months = [
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
  'December'
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday'
]

const d = new Date();

var inputValue = document.querySelector('input');

inputValue.addEventListener('keydown', updateValue);

function updateValue(e) {
  var apiURL = `${api.base}${e.target.value}&appid=${api.key}&units=${api.units}`;
  console.log(e.code);
  if (e.code === 'Enter') {
    pullData(apiURL);
  }
}

function pullData(apiURL) {
  // return new Promise((resolve, reject) => {
    fetch(apiURL)
      .then((response) => {
        if (response.ok) {
          console.log(`Fetch Success ${response.status}`);
          
          return response.json()
        }
        else {

          throw new Error(`HTTP ERROR CODE  ${response.status}`);
        }
      })
      .then((data) => {
        mappFields(data);
        // let details = data;
        // // console.log(details);        
        resolve(data);

      })
      .catch((error) => {
        console.log(error);

      })

  // })
}

function mappFields(details) {
  console.log(details);
  document.querySelector('.city').innerHTML = `${details.name}, ${details.sys.country}`;
  document.querySelector('.date').innerHTML = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  document.querySelector('.current .temp').innerHTML = `${Math.floor(details.main.temp)}°c`;
  document.querySelector('.current .weather').innerHTML = `${details.weather[0].main}`;
  document.querySelector('.current .hi-low').innerHTML = `${Math.floor(details.main.temp_min)}°c / ${Math.floor(details.main.temp_max)}°c`;
}
