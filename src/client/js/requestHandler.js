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
        postTripData('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude, start: data.start, end: data.end, city: data.city, country: data.country,photoUrl: data.photoUrl, description: data.description, temperature: data.temperature})
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
        const lon = geoData.geonames[0].lng;
        const country = geoData.geonames[0].countryName;

        const weather = getWeather(lat, lon, startDate, endDate);
        const weatherDescription = (await weather).description;
        const weatherTemperature = (await weather).temperature;
        
        const data = {
            latitude: lat,
            longitude: lon,
            start: startDate,
            end: endDate,
            city: city,
            country: country,
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
        const lastEntry = resJson[resJson.length-1];

        const fromDate = new Date(document.getElementById('date-from').value);
        const daysAmount = countDays(fromDate);

        function formatDate(date) {
            let day = "" + date.getDate();
            let month = "" + (date.getMonth()+1);
            let year = "" + date.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [day, month, year].join('/');
        }

        function countDays(date) {
            const today = new Date();
            const then = date;

            const timeToTrip = Math.abs(then - today);
            const daysToTrip = Math.ceil(timeToTrip / (1000 * 60 * 60 * 24));
            return daysToTrip;
        }

        let trip = document.createElement("div");
        trip.classList.add('trip');
        document.getElementById('trip-container').appendChild(trip);

        let tripHeader = document.createElement("div");
        tripHeader.classList.add('trip-header');
        trip.appendChild(tripHeader);
        
        let destination = document.createElement("p");
        destination.classList.add('trip-title');
        destination.innerHTML = "My trip to: " + lastEntry.city + ", " + lastEntry.country;
        tripHeader.appendChild(destination);

        let time = document.createElement("p");
        time.classList.add('trip-title');
        time.innerHTML = "Departing: " + formatDate(fromDate);
        tripHeader.appendChild(time);

        let remove = document.createElement("button");
        remove.classList.add('remove');
        remove.innerHTML = "X";
        tripHeader.appendChild(remove);

        let howLong = document.createElement("p");
        howLong.classList.add('trip-details');
        howLong.innerHTML = lastEntry.city + ", " + lastEntry.country + " is " + daysAmount + " days away";
        trip.appendChild(howLong);

        let weather = document.createElement("p");
        weather.classList.add('trip-details');
        weather.innerHTML = "Typical weather for then is: " + lastEntry.description + ", temp: " + lastEntry.temperature;
        trip.appendChild(weather);

        let photo = document.createElement("img");
        photo.classList.add('trip-photo');
        photo.src = lastEntry.photoUrl;
        photo.setAttribute('style', 'width: 40vw; height: auto;')
        trip.appendChild(photo);

        let stars = document.createElement("p");
        stars.classList.add('trip-details-end');
        stars.innerHTML = "* * *";
        trip.appendChild(stars);
        
    
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
        } else {
            try {
                const res = await fetch(predictWeatherbitUrl+lat+'&lon='+lon+'&key='+weatherbitKey);

                const weatherData = await res.json();
                const data = {
                    description: weatherData.data[15].weather.description,
                    temperature: weatherData.data[15].temp
                }
                return data;
        
            } catch(error) {
                console.log("error", error);
            }
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