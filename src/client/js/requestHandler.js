// geonames variables
const geoUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geoUser = 'lapivoinerouge';

function submitTrip(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const startDate = new Date(document.getElementById('date-from').value);
    const endDate = new Date(document.getElementById('date-to').value);

    const isValid = Client.validateDate(startDate, endDate);

    if(isValid) {
        getApiData(geoUrl, city, geoUser, startDate, endDate)
        .then(function(data) {
        postTripData('http://localhost:8000/add', {latitude: data.latitude, longitude: data.longitude, start: data.start, end: data.end, city: data.city, country: data.country,photoUrl: data.photoUrl, description: data.description, temperature: data.temperature})
        })
        .then(function(data) {
        getTripData('http://localhost:8000/all')
        });
    }
};

// get data from clients
async function getApiData(url, city, user, startDate, endDate) {
    try {
        //geonames
        const res = await fetch(url+city+'&username='+user);
        const geoData = await res.json();
        const lat = geoData.geonames[0].lat;
        const lon = geoData.geonames[0].lng;
        const country = geoData.geonames[0].countryName;
        
        //pixabay
        const photoUrl = (await Client.getPhoto(city)).url;

        //weatherbit
        const weather = Client.getWeather(lat, lon, startDate, endDate);
        const description = (await weather).description;
        const temperature = (await weather).temperature;
        
        //create complex trip data
        const data = {
            latitude: lat,
            longitude: lon,
            start: startDate,
            end: endDate,
            city: city,
            country: country,
            photoUrl: photoUrl,
            description: description,
            temperature: temperature
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

//get last trip from server
async function getTripData(url = '') {
    const res = await fetch(url);
    try {
        const resJson = await res.json();
        const lastEntry = resJson[resJson.length-1];
        createNewTrip(lastEntry);

    } catch(error) {
        console.log('error', error);
    }
};

// updates UI with created trip
function createNewTrip(lastEntry) {
        const fromDate = new Date(document.getElementById('date-from').value);
        const daysAmount = Client.countDays(fromDate);

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
        time.innerHTML = "Departing: " + Client.formatDate(fromDate);
        tripHeader.appendChild(time);

        let remove = document.createElement("button");
        remove.classList.add('remove');
        remove.innerHTML = "X";
        remove.addEventListener("click", function(e) {
            trip.setAttribute('style', 'display: none;');
        })
        tripHeader.appendChild(remove);

        let howLong = document.createElement("p");
        howLong.classList.add('trip-details');
        howLong.innerHTML = "* " + lastEntry.city + ", " + lastEntry.country + " is " + daysAmount + " days away";
        trip.appendChild(howLong);

        let weather = document.createElement("p");
        weather.classList.add('trip-details');
        weather.innerHTML = "Typical weather for then is: " + lastEntry.description + ", temperature: " + lastEntry.temperature;
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
};

export { 
    submitTrip,
    getApiData,
    postTripData,
    getTripData,
    createNewTrip
}