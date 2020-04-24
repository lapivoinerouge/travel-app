import { init } from "./js/app"

import { performAction } from "./js/requestHandler"
import { getApiData } from "./js/requestHandler"
import { getPhoto } from "./js/requestHandler"
import { getWeather } from "./js/requestHandler"
import { postTripData } from "./js/requestHandler"
import { getTripData } from "./js/requestHandler"

import { selectForecast } from "./js/forecastSelector"
import { validateDate } from "./js/dateValidator"

import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/results.scss'

import './media/holiday.jpg'
import './media/save-button.png'

window.addEventListener('DOMContentLoaded', init);

export {
    performAction,
    getApiData,
    getPhoto,
    getWeather,
    postTripData,
    getTripData,
    init,
    selectForecast,
    validateDate
}