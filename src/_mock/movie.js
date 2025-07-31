import { DateTime } from 'luxon';

import { marketListApi } from 'src/apis/marketApi';

export const optionsMarket = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 }
];

export const fetchMarkets = async () => {
  try {
    const response = await marketListApi("main"); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));

    let formattedMarkets = data.sort((a, b) => {
      const aCloseTime = parseTime(a.close_time);
      const bCloseTime = parseTime(b.close_time);

      // If close_time has passed for both, sort by open_time
      if (aCloseTime < nowTime && bCloseTime < nowTime) {
        const aOpenTime = parseTime(a.open_time);
        const bOpenTime = parseTime(b.open_time);
        return aOpenTime - bOpenTime;
      }

      // Sort by close_time with special conditions
      if (aCloseTime < nowTime) {
        return 1;
      }
      if (bCloseTime < nowTime) {
        return -1;
      }

      return aCloseTime - bCloseTime; // Default sorting by close_time
    });

    // Map the API response to the desired structure
    formattedMarkets = formattedMarkets.map((market, index) => ({
      id: index + 1,
      market_id: market._id,
      title: market.name
    }));

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};