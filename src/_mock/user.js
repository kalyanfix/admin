import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

import { adminGetApi } from 'src/apis/adminApi';

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




export const fetchAdmins = async () => {
  try {
    const response = await adminGetApi({type:'sub_admin'}); // Correct asynchronous handling
    const { admin } = response; // Ensure you're accessing the correct property
    return admin; // Return the formatted data
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    return []; // Return an empty array on error
  }
};