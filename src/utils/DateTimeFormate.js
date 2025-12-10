// Created Date Format 
export const CreatedDate = (dateString) => {
    const date = new Date(dateString);

    // Extract parts
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // AM/PM conversion
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hour "0" to "12"
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year} | ${formattedHours}:${minutes} ${ampm}`;
}