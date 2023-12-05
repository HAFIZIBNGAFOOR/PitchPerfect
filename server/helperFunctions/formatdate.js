const formatDate =(inputDate)=>{
    const date = new Date (inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}` 
}
module.exports = formatDate