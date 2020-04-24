import { init } from "./js/app"
import { submitTrip } from "./js/requestHandler"
import { getApiData } from "./js/requestHandler"
import { postTripData } from "./js/requestHandler"
import { getTripData } from "./js/requestHandler"
import { getPhoto } from "./js/photoFinder"
import { getWeather } from "./js/forecastSelector"
import { selectForecast } from "./js/forecastSelector"
import { validateDate } from "./js/dateProcessor"
import { countDays } from "./js/dateProcessor"
import { formatDate } from "./js/dateProcessor"
import { createNewTrip } from "./js/requestHandler"

import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/results.scss'

import './media/holiday.jpg'
import './media/save-button.png'

window.addEventListener('DOMContentLoaded', init);

export {
    init,
    submitTrip,
    getApiData,
    getPhoto,
    getWeather,
    postTripData,
    getTripData,
    createNewTrip, 
    selectForecast,
    validateDate,
    countDays,
    formatDate
}