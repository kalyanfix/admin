import { settingsApi } from 'src/apis/settingsApi';
import { userListApi, userUnverifiedListApi } from 'src/apis/userApi';

// ----------------------------------------------------------------------

export const fetchAllUsers = async () => {
  try {
    const response = await userListApi(); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Map the API response to the desired structure
    const formattedUsers = data.map((user, index) => ({
      id: index + 1,
      avatarUrl: `/assets/images/avatars/avatar_${generateRandomNumber(1, 24)}.jpg`,
      user_id: user._id,
      name: user.user_name,
      mobile: user.mobile,
      date: user.createdAt,
      balance: user.wallet,
      betting: user.betting,
      active: user.status,
      transfer: user.transfer,
      isVerified: user.verified,
      status: user.status ? 'active' : 'banned',
    }));

    return formattedUsers; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchApprovedUsers = async (config) => {
  try {
    const response = await userListApi(config); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Map the API response to the desired structure
    const formattedUsers = data.map((user, index) => ({
      id: index + 1,
      avatarUrl: `/assets/images/avatars/avatar_${generateRandomNumber(1, 24)}.jpg`,
      user_id: user._id,
      name: user.user_name,
      mobile: user.mobile,
      date: user.createdAt,
      balance: user.wallet,
      betting: user.betting,
      active: user.status,
      transfer: user.transfer,
      isVerified: user.verified,
      status: user.status ? 'active' : 'banned',
    }));

    return formattedUsers; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchUnapprovedUsers = async (config) => {
  try {
    const response = await userListApi(config); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Map the API response to the desired structure
    const formattedUsers = data.map((user, index) => ({
      id: index + 1,
      avatarUrl: `/assets/images/avatars/avatar_${generateRandomNumber(1, 24)}.jpg`,
      user_id: user._id,
      name: user.user_name,
      mobile: user.mobile,
      date: user.createdAt,
      balance: user.wallet,
      betting: user.betting,
      active: user.status,
      transfer: user.transfer,
      isVerified: user.verified,
      status: user.status ? 'active' : 'banned',
    }));

    return formattedUsers; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; // Return an empty array on error
  }
};

export const fetchUnverifiedUsers = async (config) => {
  try {
    const response = await userUnverifiedListApi(config); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    // Map the API response to the desired structure
    const formattedUsers = data.map((user, index) => ({
      id: index + 1,
      avatarUrl: `/assets/images/avatars/avatar_${generateRandomNumber(1, 24)}.jpg`,
      user_id: user._id,
      name: user.user_name,
      mobile: user.mobile,
      date: user.createdAt,
      balance: user.wallet,
      betting: user.betting,
      active: user.status,
      transfer: user.transfer,
      isVerified: user.verified,
      status: user.status ? 'active' : 'banned',
    }));

    return formattedUsers; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; // Return an empty array on error
  }
};

export const fetchSettingUsers = async () => {
  try {
    const response = await settingsApi(); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    return data.auto_verified; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

export const fetchSettingNotification = async () => {
  try {
    const response = await settingsApi(); // Correct asynchronous handling
    const { data } = response; // Ensure you're accessing the correct property

    return data.auto_notification; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return []; // Return an empty array on error
  }
};

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
