export const convertTo24HourFormat = (time12Hour: string): number =>{
    const [time, period] = time12Hour.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    } else if (period === 'AM' && hours === '12') {
      hours = '00';
    }

    return Number(hours);
}