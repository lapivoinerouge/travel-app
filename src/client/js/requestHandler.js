/* Global Variables */
let geoUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
let geoUser = 'lapivoinerouge';

//const tripDate = document.getElementById("trip-date").value;

function performAction(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;

    getApiData(geoUrl, city, geoUser)
    .then(function(data) {
        postGeoData('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude})
    })
    .then(function(data) {
        getGeoData('http://localhost:8000/all')
    });
};

// get data from geonames API
async function getApiData(url, city, username) {
    try {
        const res = await fetch(url+city+'&username='+username);
        
        const geoData = await res.json();
        const data = {
            latitude: geoData.geonames[0].lat,
            longitude: geoData.geonames[0].lng
        }
        return data;

    } catch(error) {
        console.log("error", error);
    }
};

// post geodata to server
async function postGeoData(url = '', data = {}) {
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

//get all geodata from server
async function getGeoData(url = '') {
    const res = await fetch(url);
    try {
        const resJson = await res.json();
    
        document.getElementById('temp').innerHTML = resJson[resJson.length-1].latitude;
        document.getElementById('date').innerHTML = resJson[resJson.length-1].longitude

    } catch(error) {
        console.log('error', error);
    }
};

export { 
    performAction,
    getApiData,
    postGeoData,
    getGeoData
}