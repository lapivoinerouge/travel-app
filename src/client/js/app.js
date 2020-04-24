function init() {
    let today = Client.formatDate(new Date());
    document.getElementById("generate").addEventListener("click", Client.submitTrip);
    document.getElementById("date-from").value = today;
    document.getElementById("date-from").min = today;
    document.getElementById("date-to").value = today;
    document.getElementById("date-to").min = today;
}

export { 
    init
}