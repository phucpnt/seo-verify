const assert = require('assert');
const parse = require('./parse');

const buildRules = require('./build-rules');

function seoVerfiy(seoRules = [], html) {
  assert(typeof html === 'string', 'html must be a string');
  seoRules.forEach((unitRule, index) => {
    assert(typeof unitRule === 'function', `rule ${index + 1} must be a function`);
  });
  let seoIssues = [];
  const ruleProcess = buildRules(...seoRules);
  parse(html, (tag, attrs) => {
    seoIssues = ruleProcess(seoIssues, tag, attrs);
  }, (error) => {
    if (error) {
      console.error('Error when parsing html...', error);
    } else if (seoIssues.length === 0) {
      console.info('No issues found.');
    } else {
      console.info('Found SEO issues: ', seoIssues.join('\n'));
    }
  });
}

module.exports = seoVerfiy;
