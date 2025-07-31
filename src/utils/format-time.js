import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function convertTime(time) {
  const date = new Date(`1970-01-01 ${time}`); // Template literal
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function conTime(time) {
  // console.log(`Input time: ${time}`);
  
  if (time.includes('AM') || time.includes('PM')) {
    const [timePart, modifier] = time.split(' ');
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = timePart.split(':');
    
    // console.log(`Parsed time part: ${timePart}, modifier: ${modifier}`);
    // console.log(`Initial hours: ${hours}, minutes: ${minutes}`);
    
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
      // console.log(`Adjusted hours for 12 AM/PM: ${hours}`);
    } else if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
      // console.log(`Adjusted hours for PM: ${hours}`);
    }

    const formattedTime = `${hours.padStart(2, '0')}:${minutes}`;
    // console.log(`Formatted time: ${formattedTime}`);
    return formattedTime;
  }
  
  const slicedTime = time.slice(0, 5);
  // console.log(`Sliced time: ${slicedTime}`);
  return slicedTime;
}



export function addHour(time) {
  // Separate the time components (hours and minutes)
  const [hours, minutes] = time.split(':');

  // Create a new Date object with the current date
  const date = new Date();
  date.setHours(parseInt(hours, 10)); // Convert hours to integer
  date.setMinutes(parseInt(minutes, 10)); // Convert minutes to integer
  date.setSeconds(0); // Optional: Set seconds to 0 to work with HH:MM format

  // Add one hour to the time
  date.setHours(date.getHours() + 1);

  // Format the result to return in "HH:MM" format
  return date.toTimeString().slice(0, 5);
}

export function dateFunc(time) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dated = time.split('T')[0];
  const timed = time.split('T')[1];

  // Extract date components
  const month = months[parseInt(dated.split('-')[1] - 1, 10)];
  const date = dated.split('-')[2];
  const year = dated.split('-')[0];

  // Split the time string into hours, minutes, seconds, and milliseconds
  const [hourStr, minuteStr] = timed.split(':');

  // Parse hours, minutes, and seconds as integers
  const hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  // Convert hours to 12-hour format
  let hour12 = hour % 12;
  hour12 = hour12 === 0 ? 12 : hour12; // Handle midnigh

  // Determine AM/PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Construct the formatted date and time string
  const formattedDateTime = `${month} ${date}, ${year} at ${hour12}:${minutes} ${amPm}`;

  return formattedDateTime;
}

export function formatDate(dateString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Create a Date object from the string
  const date = new Date(dateString);

  // Get individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date part
  const formattedDate = `${months[month - 1]} ${day}, ${year}`;

  // Get hours in 12-hour format and minutes
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Add AM/PM indicator
  const amPm = date.getHours() < 12 ? 'AM' : 'PM';

  // Format the time part
  const formattedTime = `${hours}:${minutes} ${amPm}`;

  // Combine date and time with "at" separator
  return `${formattedDate} at ${formattedTime}`;
}

export function formatOnlyDate(dateString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Create a Date object from the string
  const date = new Date(dateString);

  // Get individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date part
  const formattedDate = `${months[month - 1]} ${day}, ${year}`;

  // Combine date and time with "at" separator
  return `${formattedDate}`;
}


export const formatResultDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// eslint-disable-next-line prefer-const

export const convertResultDateFormat = (dateStr) => {
  const monthMap = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04',
    May: '05', Jun: '06', Jul: '07', Aug: '08',
    Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };

  // Handle the format "Fri Jul 05 2024"
  const [, monthName, day, year] = dateStr.split(' ');
  const month = monthMap[monthName];
  const formattedDay = day.length === 1 ? `0${day}` : day;

  return `${year}-${month}-${formattedDay}`;
};
