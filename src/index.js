/**
 * TODO:
 * [ ] define rule function
 * [ ] create test case for rules (jest)
 * [ ] use the htmlparser2, write an adapter for adapt into our rule
 */
// const html = '';

// const seoVerify = buildRules(
//   rule('img', (attrs) => !attrs.alt, '<img /> missing alt'),
//   rule('a', (attrs) => !attrs.rel, '<a /> missing rel'),
//   rule('head meta', countLessThan(1)((attrs) => attrs.name === 'description'), '<meta name="description" /> not found'),
//   rule('head meta', countLessThan(1)((attrs) => attrs.name === 'keywords'), '<meta name="keywords" /> not found'),
//   rule('strong', countMoreThan(15)(() => true), '<strong> use more than 15 times'),
//   rule('h1', countMoreThan(1)(() => true), '<h1> use more than 1 time')
// );

// const issues = seoVerify(html);
// if (issues.length === 0) {
//   console.info("No issue found.");
// } else {
//   console.error(issues.join("\n"));
// }

const makeRule = require('./rule');
const { countLessThan, countMoreThan } = require('./rule-validate-counting');
const seoVerfiy = require('./seo-verify');

module.exports = seoVerfiy;
module.exports.rule = makeRule;
module.exports.countLessThan = countLessThan;
module.exports.countMoreThan = countMoreThan;
