const user = require('../controllers/user');

test('suma de 1 mas 3 es igual a 4', () => {
  expect(user.sum(1, 3)).toBe(4);
});