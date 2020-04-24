// weatherbit variables
const currentWeatherbitUrl = 'http://api.weatherbit.io/v2.0/current?lat=';
const predictWeatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbitKey = 'bc2fd4c237194e6dbd4558a10abee3e1';

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

// returns proper forecast for the date
function selectForecast(dateFrom) {
    
    const today = new Date();
    const timeToTrip = Math.abs(dateFrom - today);
    const daysToTrip = Math.ceil(timeToTrip / (1000 * 60 * 60 * 24));

    if (daysToTrip <= 7) {
        return true;
    } else {
        return false;
    }
}

export { 
    getWeather,
    selectForecast
}