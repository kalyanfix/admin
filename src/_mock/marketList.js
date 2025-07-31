import { sample } from 'lodash';
import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';

import { marketListApi, marketDayOffListApi } from 'src/apis/marketApi';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

// export const fetchMarkets = async () => {
//   await marketListApi().then((responds) => {
//     // Map the API response to the desired structure
//     let formattedMarkets = responds.data.map((market) => ({
//       id: market._id,
//       name: market.name,
//       name_hindi: market.name_hindi,
//       open_time: market.open_time,
//       close_time: market.close_time,
//       active: market.status,
//       market_status: market.market_status,
//     }));

//     // console.log('formattedMarkets: ', formattedMarkets);

//     const parseTime = (time) => {
//       const [hours, minutes] = time.split(':').map(Number);
//       return hours * 60 + minutes;
//     };

//     const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));

//     formattedMarkets = formattedMarkets.sort((a, b) => {
//       const aCloseTime = parseTime(a.close_time);
//       const bCloseTime = parseTime(b.close_time);

//       // If close_time has passed for both, sort by open_time
//       if (aCloseTime < nowTime && bCloseTime < nowTime) {
//         const aOpenTime = parseTime(a.open_time);
//         const bOpenTime = parseTime(b.open_time);
//         return aOpenTime - bOpenTime;
//       }
//       // If close_time has passed for a, but not for b, b should come first
//       if (aCloseTime < nowTime) {
//         return 1;
//       }
//       // If close_time has passed for b, but not for a, a should come first
//       if (bCloseTime < nowTime) {
//         return -1;
//       }
//       // If close_time has not passed for both, sort normally by close_time

//       return aCloseTime - bCloseTime;
//     });

//     // console.log('formattedMarkets: ', formattedMarkets);

//     return formattedMarkets;
//   }).catch(error => {
//     console.error('Failed to fetch markets:', error);
//     return [];
//   });
// };

// Utility function to parse time in "HH:mm" format into total minutes
const parseTime = (time) => {
  if (!time) return null; // Return null if time is not available
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Utility function to format market data
const formatMarkets = (data) =>
  data.map((market, index) => ({
    id: index + 1,
    market_id: market._id,
    name: market.name,
    name_hindi: market.name_hindi,
    open_time: market.open_time || null, // Provide default value if open_time is not available
    close_time: market.close_time || null, // Provide default value if close_time is not available
    active: market.status,
    market_status: market.market_status,
    market_off_day: market.market_off_day,
  }));

// Utility function to sort markets by close time
const sortMarketsByCloseTime = (data, nowTime) =>
  data.sort((a, b) => {
    const aCloseTime = parseTime(a.close_time);
    const bCloseTime = parseTime(b.close_time);

    // Handle cases where close_time is not available
    if (aCloseTime === null && bCloseTime === null) return 0;
    if (aCloseTime === null) return 1;
    if (bCloseTime === null) return -1;

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

// Fetch function for markets
export const fetchMarkets = async (marketName) => {
  try {
    const response = await marketListApi(marketName);
    const { data } = response;

    // console.log('Data: ', data);

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));
    const today = DateTime.now().toFormat('cccc').toLowerCase(); // get the current day in lowercase

    const updatedMarkets = data.map((market) => {
      // Check if the market is off today and update market_status accordingly
      if (!market.market_off_day[today]) {
        return {
          ...market,
          market_status: false,
        };
      }
      return market;
    });

    const sortedMarkets = sortMarketsByCloseTime(updatedMarkets, nowTime);
    const formattedMarkets = formatMarkets(sortedMarkets);

    // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets;
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return [];
  }
};

// Fetch function for market day off
export const fetchDayOffMarket = async (market_id) => {
  try {
    const response = await marketDayOffListApi(market_id);
    const { data } = response;

    // console.log('Market day off data: ', data);

    return data[0]?.market_off_day ?? null;
  } catch (error) {
    console.error('Failed to fetch market day off:', error);
    return null;
  }
};
