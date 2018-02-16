const assert = require('assert');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const { seoVerify, defaultRules } = require('./index');


assert(argv.file, 'missing html file path');

const inputHtml = fs.readFileSync(path.join(process.cwd(), argv.file), 'utf8');

seoVerify(defaultRules, inputHtml);
