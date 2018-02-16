const rule = require('./src/rule');
const { countLessThan, countMoreThan } = require('./src/rule-validate-counting');
const seoVerfiy = require('./src/seo-verify');

module.exports.seoVerify = seoVerfiy;
module.exports.rule = rule;
module.exports.countLessThan = countLessThan;
module.exports.countMoreThan = countMoreThan;
module.exports.defaultRules = [
  rule('img', attrs => !attrs.alt, '<img /> missing alt'),
  rule('a', attrs => !attrs.rel, '<a /> missing rel'),
  rule('head meta', countLessThan(1)(attrs => attrs.name === 'description'), '<meta name="description" /> not found'),
  rule('head meta', countLessThan(1)(attrs => attrs.name === 'keywords'), '<meta name="keywords" /> not found'),
  rule('strong', countMoreThan(15)(() => true), '<strong> use more than 15 times'),
  rule('h1', countMoreThan(1)(() => true), '<h1> use more than 1 time'),
  rule('title', countLessThan(1)(() => true), '<title> not found'),
];
