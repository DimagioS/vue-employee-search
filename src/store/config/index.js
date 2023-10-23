export const API_URL_USERNAME = 'https://jsonplaceholder.typicode.com/users?username';
export const API_URL_ID = 'https://jsonplaceholder.typicode.com/users?id';
export const MAX_CACHE_SIZE = 50;

export const ERROR_CODES = {
  USER_NOT_FOUND: {
    message: 'Внимание: Один или несколько запрашиваемых пользователей не найдены.'
  },
  DATA_FETCH_ERROR: {
    message: 'Произошла ошибка при получении данных. Попробуйте изменить запрос.'
  },
  INVALID_FORMAT: {
    message: 'Пожалуйста, используйте формат: "1, Bret, 2".'
  }
};
