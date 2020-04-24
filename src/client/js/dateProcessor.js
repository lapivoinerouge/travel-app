// checks if the start date is not after the end date
function validateDate(dateFrom, dateTo) {

    if (dateFrom.getTime() > dateTo.getTime()) {
        alert("The trip can't end before it begins!");
        return false;
    } else {
        return true;
    }
}

// counts days to the trip
function countDays(date) {
    const today = new Date();
    const then = date;

    const timeToTrip = Math.abs(then - today);
    const daysToTrip = Math.ceil(timeToTrip / (1000 * 60 * 60 * 24));
    return daysToTrip;
}

// returns formatted date
function formatDate(date) {
    let day = "" + date.getDate();
    let month = "" + (date.getMonth()+1);
    let year = "" + date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join("-");
}

export { 
    validateDate,
    countDays,
    formatDate
}