const rule = require('../rule');
const buildRules = require('../build-rules');

it('should work as unit rule without firing issues', () => {
  const validate = jest.fn();
  validate.mockReturnValue(false);
  const unitRule = rule('any-html-tag', validate, 'should not show this message');
  const issues = unitRule(_ => _)([], 'any-html-tag', {});
  expect(validate.mock.calls.length).toBe(1);
  expect(issues.length).toBe(0);

  unitRule(_ => _)([], 'not-match-tag', {});
  expect(validate.mock.calls.length).toBe(1);

  unitRule(_ => _)([], 'any-html-tag', {});
  expect(validate.mock.calls.length).toBe(2);
});

it('should work as unit rule and firing issues', () => {
  const validate = jest.fn();
  validate.mockReturnValue(true);
  const unitRule = rule('any-html-tag', validate, 'should show this message');
  const issues = unitRule(_ => _)([], 'any-html-tag', {});
  expect(validate.mock.calls.length).toBe(1);
  expect(issues.length).toBe(1);
});

it('should work with `buildRules`', () => {
  const validate1 = jest.fn();
  const validate2 = jest.fn();
  validate1.mockReturnValue(false);
  validate2.mockReturnValue(false);

  const rule1 = rule('any-html-tag', validate1, 'should not show this message1');
  const rule2 = rule('any-html-tag', validate2, 'should not show this message2');
  const checkRules = buildRules(rule1, rule2);

  const issues = checkRules([], 'any-html-tag', {});

  expect(validate1.mock.calls.length).toBe(1);
  expect(validate2.mock.calls.length).toBe(1);
  expect(issues.length).toBe(0);
});
