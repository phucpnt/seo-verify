
module.exports.countLessThan = function countLessThan(n) {
  let count = 0;
  return validate => (attrs) => {
    if (attrs.endOfSection === true && count < n) {
      return true;
    }
    if (validate(attrs)) {
      count += 1;
    }
    return false;
  };
};

module.exports.countMoreThan = function countMoreThan(n) {
  let count = 0;
  return validate => (attrs) => {
    if (validate(attrs)) {
      count += 1;
    }
    if (count > n) {
      return true;
    }
    return false;
  };
}

