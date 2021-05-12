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

// Add event listeners
document.querySelector("#generate").addEventListener("click", getWeatherHandler);

// Event listeners handlers
function getWeatherHandler() {
    let valueZIP = elementZIP.value;
    let valueFeelings = elementFeelings.value;
    getWeather(valueZIP).then((data)=> {
        postWeather("/addData",{date: newDate, temp: data.main.temp,content: valueFeelings})}
        ).then(updateUI);
}
//---------------
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

//---------------
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