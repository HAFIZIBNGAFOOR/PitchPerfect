const convert12HourTo24Hour =  (time12h)=> {
    const [time, modifier] = time12h.split(/\s+/); // Use a regular expression to match any whitespace character
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      if (modifier === 'AM') {
        hours = '00';
      }
    } else if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }
  const getCurrentTime = ()=> {
    console.log(' inside the get current time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return formattedTime.substring(0, 8);
}
module.exports ={
    getCurrentTime,
    convert12HourTo24Hour
}