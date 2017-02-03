# sync-decorator

[![npm](https://img.shields.io/npm/v/sync-decorator.svg)](https://www.npmjs.com/package/sync-decorator)
[![Build Status](https://img.shields.io/travis/vladen/sync-decorator/master.svg)](https://travis-ci.org/vladen/sync-decorator)
[![Code Climate](https://img.shields.io/codeclimate/github/vladen/sync-decorator.svg)](https://codeclimate.com/github/vladen/sync-decorator)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vladen/sync-decorator.svg)](https://codeclimate.com/github/vladen/sync-decorator/coverage)
[![Issues](https://img.shields.io/codeclimate/issues/github/vladen/sync-decorator.svg)](https://codeclimate.com/github/vladen/sync-decorator/issues)

Decorator to ensure that class method is not called by several callers simultaneously at the moment.

* [Installation](#installation)
* [Usage](#usage)
* [Tests](https://github.com/vladen/sync-decorator/blob/master/SPEC.md)
* [License](#license)

## Installation

Install it via [npm](https://npmjs.com):

```
$ npm install --save sync-decorator
```

> This module requires NodeJS 6.9 or higher.

## Usage

Example code:

```js
const test = new class Test {
  @sync
  method(attempt) {
    console.log('executing', attempt);
    return new Promise(resolve => setTimeout(
      () => {
        console.log('executed', attempt);
        resolve();
      },
      1000
    ));
  }
}

test.method(1);
test.method(2);
test.method(3);
```

Console output:

```text
executing 1
executed 1
executing 2
executed 2
executing 3
executed 3
```

# License

MIT
