/* Global Variables */
const elementZIP = document.getElementById("zip");
const elementDate = document.getElementById("date");
const elementTemp = document.getElementById("temp");
const elementFeelings = document.getElementById("feelings");
const elementContent = document.getElementById("content");
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=EGYPT&ZIP=";
const weatherAPI_key = "&APPID=7a1cc692b22866c6c737ed0af9f96655";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Events */ 

// Post data then update UI when click button "generate"
document.querySelector("#generate").addEventListener("click", getWeatherHandler);

// Event listeners handlers
/**
 * This handler is passed to "click" event listener of "#generate" element
 * handles these jobs: fetch weather data
 *                     then post user data to server endpoint
 *                     then update UI
 */
function getWeatherHandler() {
    let valueZIP = elementZIP.value;
    let valueFeelings = elementFeelings.value;
    getWeather(valueZIP).then((data)=> {
        postWeather("/addData",{date: newDate, temp: data.main.temp,content: valueFeelings})}
        ).then(updateUI);
}

/* App functions */

/**
 * This Async function fetch data from server and update UI according to this data
 */
const updateUI = async ()=> {
    const response = await fetch ("/getData");
    try {
        const allData = await response.json();
        const lastIndex = allData.length - 1;
        elementDate.textContent = allData[lastIndex].date;
        elementTemp.textContent = allData[lastIndex].temp;
        elementContent.textContent = allData[lastIndex].content;
    }catch(error) {
        console.log("error", error);
        }

} 

/* HTTPS route requests */

/**
 * An Async function to fetch weather from site "https://api.openweathermap.org/"
 * in Egypt according to region ZIP
 * @param  {} ZIP="" Egyptian region ZIP
 */
const getWeather = async (ZIP = "")=>{
    const response = await fetch(weatherBaseUrl+ZIP+weatherAPI_key);

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

/**
 * An async function to post user data beside weather to server endpoint
 * @param  {} url='' server post route path
 * @param  {} data={} data to be posted in json form
 */
const postWeather = async ( url = '', data = {})=>{
    console.log(data);
      const request = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        return request.body;
      }catch(error) {
      console.log("error", error);
      }
  };  