import { performAction } from "./js/requestHandler"
import { getApiData } from "./js/requestHandler"
import { postGeoData } from "./js/requestHandler"
import { getGeoData } from "./js/requestHandler"
import { init } from "./js/app"
import { selectForecast } from "./js/forecastSelector"
import { validateDate } from "./js/dateValidator"

import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'

import './media/holiday.jpg'
import './media/save-button.png'

window.addEventListener('DOMContentLoaded', init);

export {
    performAction,
    getApiData,
    postGeoData,
    getGeoData,
    init,
    selectForecast,
    validateDate
}