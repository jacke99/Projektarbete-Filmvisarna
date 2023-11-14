const newDateFormat = (date) => {
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    const formattedDate = new Date(date).toLocaleDateString("sv-SE", options);

    // Extrahera veckodagen från den formaterade strängen och gör den till stor bokstav
    const weekday = formattedDate.split(' ')[0];
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const dayNumber = formattedDate.split(' ')[1];

    const month = formattedDate.split(' ')[2];

    let dayWithOrdinal;
    if ((dayNumber === "1" || dayNumber === "2" || dayNumber === "21" || dayNumber === "22" || dayNumber === "31")) {
        dayWithOrdinal = dayNumber + ":a";
    } else {
        dayWithOrdinal = dayNumber + ":e";
    }
    const finalFormattedDate = capitalizedWeekday + " " + dayWithOrdinal + " " + month;

    return finalFormattedDate;
};

export default newDateFormat;




// const newDateFormate = (date) => {
//     const dateOptions = {
//           weekday: "long",
//           // year: "numeric",
//           month: "long",
//           day: "numeric"
//       }
//     date = new Date(date).toLocaleDateString("sv-SE", dateOptions)
    
//     return date
//   }
  
//   export default newDateFormate