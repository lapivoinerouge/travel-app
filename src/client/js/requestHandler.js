// geonames variables
const geoUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geoUser = 'lapivoinerouge';

// pixabay variables
const pixabayUrl = 'https://pixabay.com/api/?key=';
const pixabayKey = '16200588-f8290938e3f301deeb4dd349e';
const pixabayCityQuery = '&q=';
const pixabayOtherParams = '&image_type=photo';

// weatherbit variables
const currentWeatherbitUrl = 'http://api.weatherbit.io/v2.0/current?lat=';
const predictWeatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbitKey = 'bc2fd4c237194e6dbd4558a10abee3e1';


function performAction(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const startDate = new Date(document.getElementById('date-from').value);
    const endDate = new Date(document.getElementById('date-to').value);

    getApiData(geoUrl, city, geoUser, startDate, endDate)
    .then(function(data) {
        postTripData('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude, photoUrl: data.photoUrl, description: data.description, temperature: data.temperature})
    })
    .then(function(data) {
        getTripData('http://localhost:8000/all')
    });
};

// get data from clients
async function getApiData(url, city, user, startDate, endDate) {
    try {
        const res = await fetch(url+city+'&username='+user);
        
        const photoUrl = (await getPhoto(city)).url;

        const geoData = await res.json();
        const lat = geoData.geonames[0].lat;
        const lon = geoData.geonames[0].lng

        const weather = getWeather(lat, lon, startDate, endDate);
        const weatherDescription = (await weather).description;
        const weatherTemperature = (await weather).temperature;
        
        const data = {
            latitude: lat,
            longitude: lon,
            photoUrl: photoUrl,
            description: weatherDescription,
            temperature: weatherTemperature
        }

        return data;

    } catch(error) {
        console.log("error", error);
    }
};

// post trip to server
async function postTripData(url = '', data = {}) {
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

//get all trips from server
async function getTripData(url = '') {
    const res = await fetch(url);
    try {
        const resJson = await res.json();
    
        document.getElementById('temp').innerHTML = resJson[resJson.length-1].latitude;
        document.getElementById('date').innerHTML = resJson[resJson.length-1].longitude

    } catch(error) {
        console.log('error', error);
    }
};

// get data from pixabay API
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

// get data from weatherbit
async function getWeather(lat, lon, dateFrom, dateTo) {

    const isValid = Client.validateDate(dateFrom, dateTo);

    if(isValid) {
        const isCurrent = Client.selectForecast(dateFrom);

        if (isCurrent) {
            try {
                const res = await fetch(currentWeatherbitUrl+lat+'&lon='+lon+'&key='+weatherbitKey);

                const weatherData = await res.json();
                const data = {
                    description: weatherData.data[0].weather.description,
                    temperature: weatherData.data[0].temp
                }
                return data;
        
            } catch(error) {
                console.log("error", error);
            }
        } else if (!isCurrent) {
            try {
                const res = await fetch(predictWeatherbitUrl+lat+'&lon='+lon+'&key='+weatherbitKey);

                const weatherData = await res.json();
                const data = {
                    description: weatherData.data[-1].weather.description,
                    temperature: weatherData.data[-1].temperature
                }
                return data;
        
            } catch(error) {
                console.log("error", error);
            }
        } else {
            console.log("wtf?!")
        }
    } else {
        console.log("date is invalid");
    }
};

export { 
    performAction,
    getApiData,
    postTripData,
    getTripData,
    getPhoto,
    getWeather
}