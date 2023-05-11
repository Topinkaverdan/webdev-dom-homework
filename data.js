export function currentDate(relevantDate) {

    const date = relevantDate;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() % 100;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    if (day < 10) day = "0" + day;
    
    if (month < 10) month = "0" + month;
    
    if (year < 10) year = "0" + year;
    
    if (hours < 10) hours = "0" + hours;
    
    if (minutes < 10) minutes = "0" + minutes;
    
    let newDate = day + "." + month + "." + year + " " + hours + ":" + minutes;
    
    return newDate;
    
    }