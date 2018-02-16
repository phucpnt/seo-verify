
const fs = require('fs');
const path = require('path');

const seoVerify = require('../seo-verify');
const rule = require('../rule');
const { countLessThan, countMoreThan } = require('../rule-validate-counting');

const inputHtml = fs.readFileSync(path.join(__dirname, './test-seo-page.html'), 'utf8');

it('should work as expected', () => {
  const spy = jest.spyOn(global.console, 'info');

  seoVerify([
    rule('img', attrs => !attrs.alt, '<img /> missing alt'),
    rule('a', attrs => !attrs.rel, '<a /> missing rel'),
    rule('head meta', countLessThan(1)(attrs => attrs.name === 'description'), '<meta name="description" /> not found'),
    rule('head meta', countLessThan(1)(attrs => attrs.name === 'keywords'), '<meta name="keywords" /> not found'),
    rule('strong', countMoreThan(15)(() => true), '<strong> use more than 15 times'),
    rule('h1', countMoreThan(1)(() => true), '<h1> use more than 1 time'),
    rule('title', countLessThan(1)(() => true), '<title> not found'),
  ], inputHtml);
  expect(spy.mock.calls.length).toBe(1);
  expect(spy.mock.calls[0][0]).toContain('<img /> missing alt');
  expect(spy.mock.calls[0][0]).toContain('<a /> missing rel');
  expect(spy.mock.calls[0][0]).toContain('<meta name="description" /> not found');
  expect(spy.mock.calls[0][0]).toContain('<meta name="keywords" /> not found');
  expect(spy.mock.calls[0][0]).toContain('<strong> use more than 15 times');
  expect(spy.mock.calls[0][0]).toContain('<h1> use more than 1 time');
  expect(spy.mock.calls[0][0]).toContain('<title> not found');
});
