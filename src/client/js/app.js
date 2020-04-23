/* Global Variables */
let geoUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
let geoUser = 'lapivoinerouge';

function init() {
    document.getElementById("form").addEventListener("submit", performAction);
    document.getElementById("generate").addEventListener("submit", performAction);
    document.getElementById("generate").addEventListener("click", performAction);
}

function performAction(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;

    getApiData(geoUrl, city, geoUser)
    .then(function(data) {
        postWeather('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude, countryCode: data.countryCode})
    })
    .then(function(data) {
        getWeather('http://localhost:8000/all')
    });
};

// get data from weather API
async function getApiData(url, city, username) {
    try {
        const res = await fetch(url+city+'&username='+username);
        const d = new Date();
        const date = d.getMonth()+"-"+d.getDay()+"-"+d.getFullYear();
        const geoData = await res.json();
        const data = {
            latitude: geoData.geonames[0].lat,
            longitude: geoData.geonames[0].lng,
            countryCode: geoData.geonames[0].countryCode
        }
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

// post weather
async function postWeather(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

//get weather
async function getWeather(url = '') {
    const res = await fetch(url);
    try {
        const resJson = await res.json();
    
        document.getElementById('temp').innerHTML = resJson[resJson.length-1].latitude;
        document.getElementById('date').innerHTML = resJson[resJson.length-1].longitude;
        document.getElementById('content').innerHTML = resJson[resJson.length-1].countryCode;

    } catch(error) {
        console.log('error', error);
    }
};

export { 
    performAction,
    getApiData,
    postWeather,
    getWeather,
    init
}