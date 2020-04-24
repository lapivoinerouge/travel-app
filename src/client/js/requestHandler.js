// geonames variables
const geoUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geoUser = 'lapivoinerouge';

// pixabay variables
const pixabayUrl = 'https://pixabay.com/api/?key=';
const pixabayKey = '16200588-f8290938e3f301deeb4dd349e';
const pixabayCityQuery = '&q=';
const pixabayOtherParams = '&image_type=photo';

//const tripDate = document.getElementById("trip-date").value;

function performAction(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;

    getApiData(geoUrl, city, geoUser)
    .then(function(data) {
        postGeoData('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude, photoUrl: data.photoUrl})
    })
    .then(function(data) {
        getGeoData('http://localhost:8000/all')
    });
};

// get data from geonames API
async function getApiData(url, city, username) {
    try {
        const res = await fetch(url+city+'&username='+username);
        
        const photoUrl = (await getPhoto(city)).url;

        const geoData = await res.json();
        const data = {
            latitude: geoData.geonames[0].lat,
            longitude: geoData.geonames[0].lng,
            photoUrl: photoUrl
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

// get data from geonames API
async function getPhoto(city) {

    const pixaCity = city.toLowerCase();

    try {
        const res = await fetch(pixabayUrl+pixabayKey+pixabayCityQuery+pixaCity+pixabayOtherParams);
        
        const pixaData = await res.json();
        const data = {
            url: pixaData.hits[0].largeImageURL
        }
        return data;

    } catch(error) {
        console.log("error", error);
    }
};