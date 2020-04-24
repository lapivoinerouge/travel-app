function validateDate(dateFrom, dateTo) {

    const today = new Date();

    if (dateFrom.getTime() > dateTo.getTime()) {
        alert("The trip can't end before it begins!");
        return false;
    } else if (dateFrom.getTime() < today.getTime()) {
        alert("You can't plan your trip in the past!");
        return false;
    } else {
        return true;
    }
}

function countDays(date) {
    const today = new Date();
    const then = date;

    const timeToTrip = Math.abs(then - today);
    const daysToTrip = Math.ceil(timeToTrip / (1000 * 60 * 60 * 24));
    return daysToTrip;
}

function formatDate(date) {
    let day = "" + date.getDate();
    let month = "" + (date.getMonth()+1);
    let year = "" + date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

export { 
    validateDate,
    countDays,
    formatDate
}