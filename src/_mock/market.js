import { DateTime } from 'luxon';

import { marketListApi, resultListApi, marketResultListApi } from 'src/apis/marketApi';

export const fetchMarkets = async () => {
  try {
    const response = await marketListApi('main'); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));
    const today = DateTime.now().toFormat('cccc').toLowerCase(); // Get the current day in lowercase

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

    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffToday = market.market_off_day[today] === true; // Check if the market is off today

      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffToday, // Update market_status: true if market is open, false if closed
      };
    });

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchStarlineMarkets = async () => {
  try {
    const response = await marketListApi('starline'); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));
    const today = DateTime.now().toFormat('cccc').toLowerCase(); // Get the current day in lowercase

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

    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffToday = market.market_off_day[today] === true; // Check if the market is off today
      // // console.log('isMarketOffToday: ', isMarketOffToday);
      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffToday, // Update market_status: true if market is open, false if closed
      };
    });

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchGaliMarkets = async () => {
  try {
    const response = await marketListApi('galidisawar'); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const today = DateTime.now().toFormat('cccc').toLowerCase(); // Get the current day in lowercase

    let formattedMarkets = data.sort((a, b) => {
      const aCloseTime = parseTime(a.close_time);
      const bCloseTime = parseTime(b.close_time);

      return aCloseTime - bCloseTime; // Default sorting by close_time
    });

    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffToday = market.market_off_day[today] === true; // Check if the market is off today
      // // console.log('isMarketOffToday: ', isMarketOffToday);
      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffToday, // Update market_status: true if market is open, false if closed
      };
    });

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchBetResults = async (date) => {
  try {
    const response = await resultListApi('main', date); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    return data; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchStarlineBetResults = async (date) => {
  try {
    const response = await resultListApi('starline', date); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    return data; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchGaliBetResults = async (date) => {
  try {
    const response = await resultListApi('galidisawar', date); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    return data; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchResultMarkets = async (date) => {
  try {
    const response = await marketResultListApi({ tag: 'main', query_date: date }); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));

    // Convert the provided 'date' to a day of the week
    const dayOfParamDate = DateTime.fromISO(date).toFormat('cccc').toLowerCase(); // Convert date to the day of the week in lowercase

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

    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffOnParamDay = market.market_off_day[dayOfParamDate] === true; // Check if the market is off on the provided day
      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffOnParamDay, // Update market_status based on the provided date's day of the week
      };
    });

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchStarlineResultMarkets = async (date) => {
  try {
    const response = await marketResultListApi({ tag: 'starline', query_date: date }); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const nowTime = parseTime(DateTime.now().toFormat('HH:mm'));
    const today = DateTime.fromISO(date).toFormat('cccc').toLowerCase(); // Get the current day in lowercase

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

    // // Map the API response to the desired structure
    // formattedMarkets = formattedMarkets.map((market, index) => ({
    //   id: index + 1,
    //   market_id: market._id,
    //   title: market.name,
    //   close_time: market.close_time,
    //   open_time: market.open_time,
    //   close_digit: market.close_digit,
    //   close_panna: market.close_panna,
    //   open_digit: market.open_digit,
    //   open_panna: market.open_panna,
    // }));

    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffToday = market.market_off_day[today] === true; // Check if the market is off today
      // // console.log('isMarketOffToday: ', isMarketOffToday);
      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffToday, // Update market_status: true if market is open, false if closed
      };
    });

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchGaliResultMarkets = async (date) => {
  try {
    const response = await marketResultListApi({ tag: 'galidisawar', query_date: date }); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // // console.log('Data: ', data);

    // Function to parse time in "HH:mm" format into total minutes
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const today = DateTime.fromISO(date).toFormat('cccc').toLowerCase(); // Get the current day in lowercase

    let formattedMarkets = data.sort((a, b) => {
      const aCloseTime = parseTime(a.close_time);
      const bCloseTime = parseTime(b.close_time);

      return aCloseTime - bCloseTime; // Default sorting by close_time
    });

    // // Map the API response to the desired structure
    // formattedMarkets = formattedMarkets.map((market, index) => ({
    //   id: index + 1,
    //   market_id: market._id,
    //   title: market.name,
    //   close_time: market.close_time,
    //   open_time: market.open_time,
    //   close_digit: market.close_digit,
    //   close_panna: market.close_panna,
    //   open_digit: market.open_digit,
    //   open_panna: market.open_panna,
    // }));


    // Map the API response to the desired structure and update market_status
    formattedMarkets = formattedMarkets.map((market, index) => {
      const isMarketOffToday = market.market_off_day[today] === true;
      // // console.log('isMarketOffToday: ', isMarketOffToday);
      return {
        id: index + 1,
        market_id: market._id,
        title: market.name,
        close_time: market.close_time,
        open_time: market.open_time,
        close_digit: market.close_digit,
        close_panna: market.close_panna,
        open_digit: market.open_digit,
        open_panna: market.open_panna,
        status: market.status,
        market_status: isMarketOffToday, // Update market_status based on the current day's market off status
      };
    });

    // // console.log('formattedMarkets: ', formattedMarkets);

    return formattedMarkets; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const halfSangumList = [
  '000',
  '100',
  '110',
  '111',
  '112',
  '113',
  '114',
  '115',
  '116',
  '117',
  '118',
  '119',
  '120',
  '122',
  '123',
  '124',
  '125',
  '126',
  '127',
  '128',
  '129',
  '130',
  '133',
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '140',
  '144',
  '146',
  '147',
  '148',
  '149',
  '150',
  '155',
  '156',
  '157',
  '158',
  '159',
  '160',
  '166',
  '167',
  '168',
  '169',
  '170',
  '177',
  '178',
  '179',
  '180',
  '188',
  '189',
  '190',
  '199',
  '200',
  '220',
  '223',
  '224',
  '225',
  '226',
  '227',
  '228',
  '229',
  '230',
  '233',
  '234',
  '235',
  '237',
  '238',
  '239',
  '240',
  '244',
  '245',
  '246',
  '247',
  '248',
  '249',
  '250',
  '255',
  '256',
  '257',
  '258',
  '259',
  '260',
  '266',
  '267',
  '268',
  '269',
  '270',
  '277',
  '278',
  '279',
  '280',
  '288',
  '289',
  '290',
  '299',
  '300',
  '330',
  '334',
  '335',
  '336',
  '337',
  '338',
  '339',
  '340',
  '344',
  '345',
  '346',
  '347',
  '348',
  '349',
  '350',
  '355',
  '356',
  '357',
  '358',
  '359',
  '360',
  '366',
  '367',
  '368',
  '369',
  '370',
  '377',
  '378',
  '379',
  '380',
  '388',
  '389',
  '390',
  '399',
  '400',
  '440',
  '445',
  '446',
  '447',
  '448',
  '449',
  '450',
  '455',
  '456',
  '457',
  '458',
  '459',
  '460',
  '467',
  '468',
  '469',
  '470',
  '477',
  '478',
  '479',
  '480',
  '488',
  '489',
  '499',
  '550',
  '556',
  '557',
  '558',
  '559',
  '560',
  '566',
  '567',
  '568',
  '569',
  '570',
  '577',
  '578',
  '579',
  '580',
  '588',
  '589',
  '590',
  '599',
  '600',
  '660',
  '667',
  '668',
  '669',
  '670',
  '677',
  '678',
  '679',
  '680',
  '688',
  '689',
  '690',
  '699',
  '770',
  '778',
  '779',
  '780',
  '788',
  '789',
  '790',
  '799',
  '800',
  '880',
  '888',
  '889',
  '890',
  '899',
  '900',
  '990',
  '999',
];

export const fullList = [
  { panna: '128', digit: '1' },
  { panna: '137', digit: '1' },
  { panna: '146', digit: '1' },
  { panna: '236', digit: '1' },
  { panna: '245', digit: '1' },
  { panna: '290', digit: '1' },
  { panna: '380', digit: '1' },
  { panna: '470', digit: '1' },
  { panna: '489', digit: '1' },
  { panna: '560', digit: '1' },
  { panna: '579', digit: '1' },
  { panna: '678', digit: '1' },
  { panna: '100', digit: '1' },
  { panna: '119', digit: '1' },
  { panna: '155', digit: '1' },
  { panna: '227', digit: '1' },
  { panna: '335', digit: '1' },
  { panna: '344', digit: '1' },
  { panna: '399', digit: '1' },
  { panna: '588', digit: '1' },
  { panna: '669', digit: '1' },
  { panna: '777', digit: '1' },
  { panna: '129', digit: '2' },
  { panna: '138', digit: '2' },
  { panna: '147', digit: '2' },
  { panna: '156', digit: '2' },
  { panna: '237', digit: '2' },
  { panna: '246', digit: '2' },
  { panna: '345', digit: '2' },
  { panna: '390', digit: '2' },
  { panna: '480', digit: '2' },
  { panna: '570', digit: '2' },
  { panna: '589', digit: '2' },
  { panna: '679', digit: '2' },
  { panna: '110', digit: '2' },
  { panna: '200', digit: '2' },
  { panna: '228', digit: '2' },
  { panna: '255', digit: '2' },
  { panna: '336', digit: '2' },
  { panna: '499', digit: '2' },
  { panna: '660', digit: '2' },
  { panna: '688', digit: '2' },
  { panna: '778', digit: '2' },
  { panna: '444', digit: '2' },
  { panna: '120', digit: '3' },
  { panna: '139', digit: '3' },
  { panna: '148', digit: '3' },
  { panna: '157', digit: '3' },
  { panna: '238', digit: '3' },
  { panna: '247', digit: '3' },
  { panna: '256', digit: '3' },
  { panna: '346', digit: '3' },
  { panna: '490', digit: '3' },
  { panna: '580', digit: '3' },
  { panna: '670', digit: '3' },
  { panna: '689', digit: '3' },
  { panna: '166', digit: '3' },
  { panna: '229', digit: '3' },
  { panna: '300', digit: '3' },
  { panna: '337', digit: '3' },
  { panna: '355', digit: '3' },
  { panna: '445', digit: '3' },
  { panna: '599', digit: '3' },
  { panna: '779', digit: '3' },
  { panna: '788', digit: '3' },
  { panna: '111', digit: '3' },
  { panna: '130', digit: '4' },
  { panna: '149', digit: '4' },
  { panna: '158', digit: '4' },
  { panna: '167', digit: '4' },
  { panna: '239', digit: '4' },
  { panna: '248', digit: '4' },
  { panna: '257', digit: '4' },
  { panna: '347', digit: '4' },
  { panna: '356', digit: '4' },
  { panna: '590', digit: '4' },
  { panna: '680', digit: '4' },
  { panna: '789', digit: '4' },
  { panna: '112', digit: '4' },
  { panna: '220', digit: '4' },
  { panna: '266', digit: '4' },
  { panna: '338', digit: '4' },
  { panna: '400', digit: '4' },
  { panna: '446', digit: '4' },
  { panna: '455', digit: '4' },
  { panna: '699', digit: '4' },
  { panna: '770', digit: '4' },
  { panna: '888', digit: '4' },
  { panna: '140', digit: '5' },
  { panna: '159', digit: '5' },
  { panna: '168', digit: '5' },
  { panna: '230', digit: '5' },
  { panna: '249', digit: '5' },
  { panna: '258', digit: '5' },
  { panna: '267', digit: '5' },
  { panna: '348', digit: '5' },
  { panna: '357', digit: '5' },
  { panna: '456', digit: '5' },
  { panna: '690', digit: '5' },
  { panna: '780', digit: '5' },
  { panna: '113', digit: '5' },
  { panna: '122', digit: '5' },
  { panna: '177', digit: '5' },
  { panna: '339', digit: '5' },
  { panna: '366', digit: '5' },
  { panna: '447', digit: '5' },
  { panna: '500', digit: '5' },
  { panna: '799', digit: '5' },
  { panna: '889', digit: '5' },
  { panna: '555', digit: '5' },
  { panna: '123', digit: '6' },
  { panna: '150', digit: '6' },
  { panna: '169', digit: '6' },
  { panna: '178', digit: '6' },
  { panna: '240', digit: '6' },
  { panna: '259', digit: '6' },
  { panna: '268', digit: '6' },
  { panna: '349', digit: '6' },
  { panna: '358', digit: '6' },
  { panna: '367', digit: '6' },
  { panna: '457', digit: '6' },
  { panna: '790', digit: '6' },
  { panna: '114', digit: '6' },
  { panna: '277', digit: '6' },
  { panna: '330', digit: '6' },
  { panna: '448', digit: '6' },
  { panna: '466', digit: '6' },
  { panna: '556', digit: '6' },
  { panna: '600', digit: '6' },
  { panna: '880', digit: '6' },
  { panna: '899', digit: '6' },
  { panna: '222', digit: '6' },
  { panna: '124', digit: '7' },
  { panna: '160', digit: '7' },
  { panna: '278', digit: '7' },
  { panna: '179', digit: '7' },
  { panna: '250', digit: '7' },
  { panna: '269', digit: '7' },
  { panna: '340', digit: '7' },
  { panna: '359', digit: '7' },
  { panna: '368', digit: '7' },
  { panna: '458', digit: '7' },
  { panna: '467', digit: '7' },
  { panna: '890', digit: '7' },
  { panna: '115', digit: '7' },
  { panna: '133', digit: '7' },
  { panna: '188', digit: '7' },
  { panna: '223', digit: '7' },
  { panna: '377', digit: '7' },
  { panna: '449', digit: '7' },
  { panna: '557', digit: '7' },
  { panna: '566', digit: '7' },
  { panna: '700', digit: '7' },
  { panna: '999', digit: '7' },
  { panna: '125', digit: '8' },
  { panna: '134', digit: '8' },
  { panna: '170', digit: '8' },
  { panna: '189', digit: '8' },
  { panna: '260', digit: '8' },
  { panna: '279', digit: '8' },
  { panna: '350', digit: '8' },
  { panna: '369', digit: '8' },
  { panna: '468', digit: '8' },
  { panna: '378', digit: '8' },
  { panna: '459', digit: '8' },
  { panna: '567', digit: '8' },
  { panna: '116', digit: '8' },
  { panna: '224', digit: '8' },
  { panna: '233', digit: '8' },
  { panna: '288', digit: '8' },
  { panna: '440', digit: '8' },
  { panna: '477', digit: '8' },
  { panna: '558', digit: '8' },
  { panna: '800', digit: '8' },
  { panna: '990', digit: '8' },
  { panna: '666', digit: '8' },
  { panna: '126', digit: '9' },
  { panna: '135', digit: '9' },
  { panna: '180', digit: '9' },
  { panna: '234', digit: '9' },
  { panna: '270', digit: '9' },
  { panna: '289', digit: '9' },
  { panna: '360', digit: '9' },
  { panna: '379', digit: '9' },
  { panna: '450', digit: '9' },
  { panna: '469', digit: '9' },
  { panna: '478', digit: '9' },
  { panna: '568', digit: '9' },
  { panna: '117', digit: '9' },
  { panna: '144', digit: '9' },
  { panna: '199', digit: '9' },
  { panna: '225', digit: '9' },
  { panna: '388', digit: '9' },
  { panna: '559', digit: '9' },
  { panna: '577', digit: '9' },
  { panna: '667', digit: '9' },
  { panna: '900', digit: '9' },
  { panna: '333', digit: '9' },
  { panna: '127', digit: '0' },
  { panna: '136', digit: '0' },
  { panna: '145', digit: '0' },
  { panna: '190', digit: '0' },
  { panna: '235', digit: '0' },
  { panna: '280', digit: '0' },
  { panna: '370', digit: '0' },
  { panna: '389', digit: '0' },
  { panna: '460', digit: '0' },
  { panna: '479', digit: '0' },
  { panna: '569', digit: '0' },
  { panna: '578', digit: '0' },
  { panna: '118', digit: '0' },
  { panna: '226', digit: '0' },
  { panna: '244', digit: '0' },
  { panna: '299', digit: '0' },
  { panna: '334', digit: '0' },
  { panna: '488', digit: '0' },
  { panna: '550', digit: '0' },
  { panna: '668', digit: '0' },
  { panna: '677', digit: '0' },
  { panna: '000', digit: '0' },
];

export const halflist = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
];

export const fullDigit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
