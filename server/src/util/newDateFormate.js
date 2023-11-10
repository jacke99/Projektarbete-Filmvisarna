const newDateFormate = (date) => {
  const dateOptions = {
        weekday: "long",
        // year: "numeric",
        month: "long",
        day: "numeric"
    }
  date = new Date(date).toLocaleDateString("sv-SE", dateOptions)
  
  return date
}

export default newDateFormate