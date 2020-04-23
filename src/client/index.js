import { performAction } from "./js/app"
import { getApiData } from "./js/app"
import { postWeather } from "./js/app"
import { getWeather } from "./js/app"

import { init } from "./js/app"

import './styles/style.scss'

window.addEventListener('DOMContentLoaded', init);

export {
    performAction,
    getApiData,
    postWeather,
    getWeather
}