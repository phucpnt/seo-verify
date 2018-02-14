const htmlParser = require('htmlparser2');

const inputHtmlStr = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
  </head>
  <body>
  
  </body>
</html>
`;

it('should invoke rule for unit html tag', (done) => {
  const fakeRule = jest.fn();

  const handler = {
    onopentag(tagName, attrs) {
      fakeRule(tagName, attrs);
    },
    onclosetag(tagName) {
      fakeRule(tagName, { endOfSection: true });
    },
    onend() {
      expect(fakeRule.mock.calls.length).toEqual(10);
      expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].endOfSection)
        .length).toEqual(5);
      expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].charset)
        .length).toEqual(1);
      done();
    },
  };

  const parser = new htmlParser.Parser(handler);
  parser.write(inputHtmlStr);
  parser.end();
});

it('should invoke rule with full path of tags', (done) => {
  const fakeRule = jest.fn();

  let tagPath = [];
  const handler = {
    onopentag(tagName, attrs) {
      tagPath = tagPath.concat(tagName);
      fakeRule([].concat(tagPath), attrs);
    },
    onclosetag(tagName) {
      tagPath = tagPath.slice(0, -1);
      fakeRule([].concat(tagPath), { endOfSection: true });
    },
    onend() {
      expect(fakeRule.mock.calls.length).toEqual(10);
      expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].endOfSection)
        .length).toEqual(5);
      expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].charset)
        .length).toEqual(1);
      expect(fakeRule.mock.calls.filter(invokeArgs => JSON.stringify(invokeArgs[0]) === JSON.stringify(['html', 'head', 'title']))
        .length).toEqual(1);
      expect(tagPath.length).toEqual(0);
      done();
    },
  };

  const parser = new htmlParser.Parser(handler);
  parser.write(inputHtmlStr);
  parser.end();
});
