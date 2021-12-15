export const getMonth = (month: number) => {
    Date.prototype.monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    Date.prototype.getMonthName = function () {
        return this.monthNames[month];
    };
    return new Date().getMonthName();
}

export const getDay = (day: number) => {
    Date.prototype.dayNames = ["Sunday",
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    Date.prototype.getDayName = function () {
        return this.dayNames[day];
    };
    return new Date().getDayName();
}

export const getDateSuffix = (date: number, month: number) => {
    var i = date;
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st " + getMonth(month);
    }
    if (j == 2 && k != 12) {
        return i + "nd " + getMonth(month);
    }
    if (j == 3 && k != 13) {
        return i + "rd " + getMonth(month);
    }
    return i + "th " + getMonth(month);
}

export const getTime = (date: Date) => {
    let hours = new Date(date).getHours()
    let minutes = new Date(date).getMinutes()
    var type = hours <= 11 ? 'AM' : 'PM'
    var stringHours = hours.toString()
    var stringMinutes = minutes.toString()
    if (stringHours.length < 2) {
        stringHours = "0" + hours
    }
    if (stringMinutes.length < 2) {
        stringMinutes = "0" + minutes
    }
    return stringHours + ":" + stringMinutes + " " 
}

export const formatDate = (date: string, sort: number) => {
    let sortedDate = new Date(date).getDate() + sort
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + sortedDate,
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getHours = () => {
   var hoursArray = Array<string>()
   for (let i = 0; i <= 12; i ++) {
       let value = i.toString()
       hoursArray.push(value.length < 2 ? '0' + value : value)
   }
   return hoursArray
}

export const getMinutes = () => {
    var minutesArray = Array<string>()
    for (let i = 0; i <= 60; i ++) {
        let value = i.toString()
        minutesArray.push(value.length < 2 ? '0' + value : value)
    }
    return minutesArray
 }