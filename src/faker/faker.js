import { faker } from "@faker-js/faker";

export const generateUserObject = (locale, seed) => {
  faker.locale = locale;
  if (locale === "ru") {
    return {
      id: faker.datatype.uuid(),
      fullName: `${faker.name.lastName()} ${faker.name.firstName()} ${faker.name.middleName()}`,
      address: {
        city: faker.address.cityName(),
      },
    };
  }
};
