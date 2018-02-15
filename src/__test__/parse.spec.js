const parse = require('../parse');

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

  parse(inputHtmlStr, fakeRule, (err) => {
    expect(err).toBeNull();
    expect(fakeRule.mock.calls.length).toEqual(10);
    expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].endOfSection)
      .length).toEqual(5);
    expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].charset)
      .length).toEqual(1);
    done();
  });
});

it('should invoke rule with full path of tags', (done) => {
  const fakeRule = jest.fn();
  parse(inputHtmlStr, fakeRule, (error) => {
    expect(error).toBeNull();
    expect(fakeRule.mock.calls.length).toEqual(10);
    expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].endOfSection)
      .length).toEqual(5);
    expect(fakeRule.mock.calls.filter(invokeArgs => invokeArgs[1].charset)
      .length).toEqual(1);
    expect(fakeRule.mock.calls.filter(invokeArgs => JSON.stringify(invokeArgs[0]) === JSON.stringify(['html', 'head', 'title']))
      .length).toEqual(1);
    done();
  });
});
