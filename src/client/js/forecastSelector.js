function selectForecast(dateFrom, dateTo) {

    const isValid = Client.validateDate(dateFrom, dateTo);
    
    if (isValid) {
        const today = new Date();
        const timeToTrip = Math.abs(dateFrom - today);
        const daysToTrip = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (daysToTrip <= 7) {
            console.log("current forecast");
            return "current";
        } else {
            return "predict";
        }
    } else {
        return "";
    }
}

export { 
    selectForecast
}