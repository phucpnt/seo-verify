module.exports.countLessThan = function countLessThan(n) {
  let count = 0;

  return (validate) => {
    const validateWithCounting = (attrs) => {
      if (attrs.endOfSection && count < n) {
        return true;
      }
      if (validate(attrs)) {
        count += 1;
      }
      return false;
    };

    validateWithCounting.matchEndingSection = (ruleTagPath, currentTagPath) =>
      JSON.stringify(ruleTagPath.slice(0, -1)) ===
      JSON.stringify(currentTagPath.slice(-(ruleTagPath.length - 1)));
    return validateWithCounting;
  };
};

module.exports.countMoreThan = function countMoreThan(n) {
  let count = 0;
  let once = false;
  return validate => (attrs) => {
    if (validate(attrs)) {
      count += 1;
    }
    if (count > n && !once) {
      once = true;
      return true;
    }
    return false;
  };
};
