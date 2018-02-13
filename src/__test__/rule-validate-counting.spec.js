const { countLessThan, countMoreThan } = require('../rule-validate-counting');

it('countLessThan should work', () => {
  const validateTrue = countLessThan(1)(attrs => attrs.name === 'keyword');
  expect(validateTrue({ a: 'b' })).toBeFalsy();
  expect(validateTrue({ endOfSection: true })).toBeTruthy();

  const validateFalse = countLessThan(1)(attrs => attrs.name === 'keyword');
  expect(validateFalse({ name: 'keyword' })).toBeFalsy();
  expect(validateFalse({ endOfSection: true })).toBeFalsy();

  let validateFalse2 = countLessThan(2)(attrs => attrs.name === 'keyword');
  expect(validateFalse2({ name: 'keyword' })).toBeFalsy();
  expect(validateFalse2({ endOfSection: true })).toBeTruthy();

  validateFalse2 = countLessThan(2)(attrs => attrs.name === 'keyword');
  expect(validateFalse2({ name: 'keyword' })).toBeFalsy();
  expect(validateFalse2({ name: 'keyword' })).toBeFalsy();
  expect(validateFalse2({ endOfSection: true })).toBeFalsy();
});

it('countMoreThan should work', () => {
  const validate = countMoreThan(1)(attrs => attrs.name === 'keyword');
  expect(validate({ a: 'b' })).toBeFalsy();
  expect(validate({ endOfSection: true })).toBeFalsy();
  expect(validate({ name: 'keyword' })).toBeFalsy();
  expect(validate({ name: 'keyword' })).toBeTruthy();
});
