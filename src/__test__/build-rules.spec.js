const buildRules = require('../build-rules');

it('given fake rules, the build rules should work', () => {
  const rule1 = jest.fn().mockImplementation(next => any => next(any));
  const rule2 = jest.fn().mockImplementation(next => any => next(any));

  const checkRules = buildRules(rule1, rule2);
  const result = checkRules('aaa');

  expect(result).toEqual('aaa');
  expect(rule1.mock.calls.length).toEqual(1);
  expect(rule2.mock.calls.length).toEqual(1);
});

it('given fake rules, the build rules should follow order', () => {
  const rule1 = jest.fn().mockImplementation(next => any => next(any + 'b'));
  const rule2 = jest.fn().mockImplementation(next => any => next(any + 'c'));

  const checkRules = buildRules(rule1, rule2);
  const result = checkRules('a');

  expect(result).toEqual('abc');
  expect(rule1.mock.calls.length).toEqual(1);
  expect(rule2.mock.calls.length).toEqual(1);
});
