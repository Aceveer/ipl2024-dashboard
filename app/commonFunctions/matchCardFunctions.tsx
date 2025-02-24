function formatDateWithDay(dateString: string): string {

  if(!dateString){
    return ""
  }
    const [day, month, year] = dateString.split("-"); // Split the input string into day, month, year
    const dateObj = new Date(`${year}-${month}-${day}`); // Create a Date object using the input
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const monthName = monthNames[dateObj.getMonth()]; // Get the month name
    const dayName = dayNames[dateObj.getDay()]; // Get the day of the week
    
    return `${monthName}, ${day} ${dayName}`; // Format as "Month, Date DayName"
  }

  


  export default formatDateWithDay