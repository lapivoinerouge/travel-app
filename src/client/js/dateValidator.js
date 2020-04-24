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

export { 
    validateDate
}