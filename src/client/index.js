import { performAction } from "./js/app"
import { getApiData } from "./js/app"
import { postWeather } from "./js/app"
import { getWeather } from "./js/app"
import { init } from "./js/app"

import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'

import './media/holiday.jpg'
import './media/save-button.png'

window.addEventListener('DOMContentLoaded', init);

export {
    performAction,
    getApiData,
    postWeather,
    getWeather
}