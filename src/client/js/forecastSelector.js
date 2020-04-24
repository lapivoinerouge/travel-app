function selectForecast(dateFrom) {
    
    const today = new Date();
    const timeToTrip = Math.abs(dateFrom - today);
    const daysToTrip = Math.ceil(timeToTrip / (1000 * 60 * 60 * 24));

    if (daysToTrip <= 7) {
        console.log("current forecast");
        return true;
    } else {
        console.log("predict forecast");
        return false;
    }
}

export { 
    selectForecast
}