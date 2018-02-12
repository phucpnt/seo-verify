
const html = '';

const seoVerify = buildRules(
  rules('img', (attrs) => !attrs.alt, '<img /> missing alt'),
  rules('a', (attrs) => !attrs.rel, '<a /> missing rel'),
  rules('head meta', countLessThan(1)((attrs) => attrs.name === 'description'), '<meta name="description" /> not found'),
  rules('head meta', countLessThan(1)((attrs) => attrs.name === 'keywords'), '<meta name="keywords" /> not found'),
  rules('strong', countMoreThan(15)(() => true), '<strong> use more than 15 times'),
  rules('h1', countMoreThan(1)(() => true), '<h1> use more than 1 time')
);

const issues = seoVerify(html);
if (issues.length === 0) {
  console.info("no issue found.");
} else {
  console.error(issues.join("\n"));
}