const htmlParser = require('htmlparser2');
const assert = require('assert');

const createHandler = (seoRule, callback) => {
  let tagPath = [];
  const handler = {
    onopentag(tagName, attrs) {
      tagPath = tagPath.concat(tagName);
      seoRule([].concat(tagPath), attrs);
    },
    onclosetag(/* tagName */) {
      tagPath = tagPath.slice(0, -1);
      seoRule([].concat(tagPath), { endOfSection: true });
    },
    onend() {
      callback(null);
    },
    onerror(error) {
      callback(error);
    },
  };
  return handler;
};

function parse(html, seoRule, callback) {
  assert(typeof html === 'string', 'html must be a string');
  assert(typeof seoRule === 'function', 'seoRule must be a function');
  assert(typeof callback === 'function', 'callback must be a function');

  const parser = new htmlParser.Parser(createHandler(seoRule, callback));
  parser.write(html);
  parser.done();
}

module.exports = parse;
