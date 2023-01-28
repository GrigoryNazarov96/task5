import { faker } from '@faker-js/faker';

export const generateNUsers = (locale, seed, n, errorProbability) => {
  const users = [];
  faker.seed(seed);
  faker.locale = locale;

  function generatePatronym(fathersName, sex) {
    if (fathersName.endsWith('й') || fathersName.endsWith('ь')) {
      const postfix = sex === 'male' ? 'евич' : 'евна';
      return fathersName.slice(0, -1) + postfix;
    }
    if (fathersName.endsWith('а')) {
      const postfix = sex === 'male' ? 'ич' : 'ична';
      return fathersName.slice(0, -1) + postfix;
    }
    const postfix = sex === 'male' ? 'ович' : 'овна';
    return fathersName + postfix;
  }

  function createRandomUser() {
    let fullName;

    if (faker.locale === 'ru') {
      const sexes = ['male', 'female'];
      const sex = faker.helpers.arrayElement(sexes);
      const fathersName = faker.name.firstName('male');
      fullName = `${faker.name.lastName(sex)} ${faker.name.firstName(
        sex
      )} ${generatePatronym(fathersName, sex)}`;
    } else {
      fullName = faker.name.fullName();
    }

    return {
      id: faker.datatype.uuid(),
      fullName,
      address: `${faker.address.cityName()}, ${faker.address.streetAddress()}, ${faker.address.secondaryAddress()}, ${faker.address.zipCode()}`,
      phone: faker.phone.number(),
    };
  }
  for (let i = 0; i < n; i++) {
    users.push(createRandomUser());
  }
  return applyErrorsToUsers(users, seed, errorProbability);
};

function applyErrorsToUsers(users, seed, errorProbability) {
  faker.seed(seed);

  const alphabeths = {
    ru: [
      'а',
      'б',
      'в',
      'г',
      'д',
      'е',
      'ё',
      'ж',
      'з',
      'и',
      'й',
      'к',
      'л',
      'м',
      'н',
      'о',
      'п',
      'р',
      'с',
      'т',
      'у',
      'ф',
      'х',
      'ц',
      'ч',
      'ш',
      'щ',
      'ъ',
      'ы',
      'ь',
      'э',
      'ю',
      'я',
    ],
    he: [
      'א',
      'ב',
      'ג',
      'ד',
      'ה',
      'ו',
      'ז',
      'ח',
      'ט',
      'י',
      'ך',
      'כ',
      'ל',
      'ם',
      'מ',
      'ן',
      'נ',
      'ס',
      'ע',
      'ף',
      'פּ',
      'ץ',
      'צ',
      'ק',
      'ר',
      'ש',
      'ת',
    ],
    de: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'ä',
      'ö',
      'ü',
      'ß',
    ],
  };

  const replaceChars = (string) => {
    const n = faker.datatype.number({ max: string.length - 1 });
    const chars = string.split('');
    const temp = chars[n];
    chars[n] = chars[n + 1];
    chars[n + 1] = temp;
    return chars.join('');
  };

  const removeChar = (string) => {
    const n = faker.datatype.number({ max: string.length - 1 });
    return string.slice(0, n) + string.slice(n + 1, string.length);
  };

  const addChar = (string) => {
    const n = faker.datatype.number({ max: string.length - 1 });
    return (
      string.slice(0, n) +
      faker.helpers.arrayElement(alphabeths[faker.locale]) +
      string.slice(n + 1, string.length)
    );
  };

  const generateRandomError = (string) => {
    const n = faker.datatype.number({ max: 2 });
    switch (n) {
      case 0:
        return replaceChars(string);
      case 1:
        if (string.length < 20) {
          return addChar(string);
        }
        return removeChar(string);
      case 2:
        if (string.length > 100) {
          return removeChar(string);
        }
        return addChar(string);
      default:
        return;
    }
  };

  const selectColumn = (user) => {
    const n = faker.datatype.number({ max: 2 });
    switch (n) {
      case 0:
        user.fullName = generateRandomError(user.fullName);
        break;
      case 1:
        user.address = generateRandomError(user.address);
        break;
      case 2:
        user.phone = generateRandomError(user.phone);
        break;
      default:
        break;
    }
    return user;
  };

  const applyErrors = (probability, user) => {
    for (let i = 0; i < probability; i++) {
      user = selectColumn(user);
    }
    faker.helpers.maybe(() => (user = selectColumn(user)), {
      probability: probability % 1,
    });
    return user;
  };

  return users.map((user) => applyErrors(errorProbability, user));
}
