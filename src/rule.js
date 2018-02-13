
// eslint-disable-next-line no-unused-vars
function rule(htmlTag, catchIssue = attrs => false, warningMsg = '') {
  return next => (issues, iTag, iAttrs) => {
    if (iTag === htmlTag && catchIssue(iAttrs)) {
      return next(issues.concat(warningMsg), iTag, iAttrs);
    }
    return next(issues, iTag, iAttrs);
  };
}

module.exports = rule;
