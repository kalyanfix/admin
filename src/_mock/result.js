import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const results = [...Array(24)].map((_, index) => ({
  id: faker.string.numeric(5),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  // name: faker.person.firstName(),
  game: faker.person.firstName(),
  result: faker.date.recent({ days: 10 }),
  open: faker.date.recent({ days: 10 }),
  close: faker.date.recent({ days: 10 }),
  open_panna: `${faker.string.numeric(3)}-${faker.string.numeric(1)}`,
  close_panna: `${faker.string.numeric(3)}-${faker.string.numeric(1)}`
}));
