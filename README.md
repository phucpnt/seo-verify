## Requirements

* Node >= 8.0, npm >= 5.0

## How to use this library

* npm install seo-verify
* or visit https://github.com/phucpnt/seo-verify


## Write your own seo rules
* By default this library came with basic seo rules as the following snippet:
  ```javascript
  [
    rule('img', attrs => !attrs.alt, '<img /> missing alt'),
    rule('a', attrs => !attrs.rel, '<a /> missing rel'),
    rule('head meta', countLessThan(1)(attrs => attrs.name === 'description'), '<meta name="description" /> not found'),
    rule('head meta', countLessThan(1)(attrs => attrs.name === 'keywords'), '<meta name="keywords" /> not found'),
    rule('strong', countMoreThan(15)(() => true), '<strong> use more than 15 times'),
    rule('h1', countMoreThan(1)(() => true), '<h1> use more than 1 time'),
    rule('title', countLessThan(1)(() => true), '<title> not found'),
  ]
  ```
* A seo rule will need: 
  1) A html tag or [css element element selector](https://www.w3schools.com/cssref/sel_element_element.asp)
  2) Capture function for catching seo issue  
  if you just need to validate the tag exits just put a function that return `true`
  3) A message to print out seo issues on your console.
* Example for adding new rule:
  ```javascript
  const {seoVerify , defaultRules, rule, countLessThan} = require('seo-verify');
  seoVerify(defaultRules.concat([
    rule('head meta', countLessThan(1)(attrs => attrs.name = 'robot'), '<meta name="robot" /> not found')
    // more rules...
  ]))
  ```

