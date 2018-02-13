const compose = require('./util-compose');

const identity = _ => _;

function buildRules(...rules) {
  return compose(...rules)(identity);
}

module.exports = buildRules;
