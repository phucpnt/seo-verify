// eslint-disable-next-line no-unused-vars
function rule(htmlTag, catchIssue = attrs => false, warningMsg = '') {
  const tagPath = htmlTag.split(' ');

  return next => (issues, iTag, iAttrs) => {
    if (
      iAttrs.endOfSection &&
      catchIssue.matchEndingSection &&
      catchIssue.matchEndingSection(tagPath, iAttrs.endOfSection) &&
      catchIssue(iAttrs)
    ) {
      return next(issues.concat(warningMsg), iTag, iAttrs);
    }
    if (
      !iAttrs.endOfSection &&
      validTagPath([].concat(iTag), tagPath) &&
      catchIssue(iAttrs)
    ) {
      return next(issues.concat(warningMsg), iTag, iAttrs);
    }
    return next(issues, iTag, iAttrs);
  };
}

module.exports = rule;

function validTagPath(compareTagPath = [], inputTagPath = []) {
  let currentTagPath = [].concat(compareTagPath);
  return inputTagPath.every((tag) => {
    const fIndex = currentTagPath.indexOf(tag);
    if (fIndex === -1) {
      return false;
    }
    currentTagPath = currentTagPath.slice(fIndex);
    return true;
  });
}
