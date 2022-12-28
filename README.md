# grunt-markdownlint

[![NPM Version](http://img.shields.io/npm/v/grunt-markdownlint.svg?style=flat)](https://www.npmjs.org/package/grunt-markdownlint) [![CI](https://github.com/sagiegurari/grunt-markdownlint/workflows/CI/badge.svg?branch=master)](https://github.com/sagiegurari/grunt-markdownlint/actions) [![Coverage Status](https://coveralls.io/repos/sagiegurari/grunt-markdownlint/badge.svg)](https://coveralls.io/r/sagiegurari/grunt-markdownlint) [![Known Vulnerabilities](https://snyk.io/test/github/sagiegurari/grunt-markdownlint/badge.svg)](https://snyk.io/test/github/sagiegurari/grunt-markdownlint) [![Inline docs](http://inch-ci.org/github/sagiegurari/grunt-markdownlint.svg?branch=master)](http://inch-ci.org/github/sagiegurari/grunt-markdownlint) [![License](https://img.shields.io/npm/l/grunt-markdownlint.svg?style=flat)](https://github.com/sagiegurari/grunt-markdownlint/blob/master/LICENSE) [![Total Downloads](https://img.shields.io/npm/dt/grunt-markdownlint.svg?style=flat)](https://www.npmjs.org/package/grunt-markdownlint)

> A grunt task for markdown style checker and lint tool.

* [Overview](#overview)
* [Usage](#usage)
* [Installation](#installation)
* [API Documentation](docs/api.md)
* [Contributing](.github/CONTRIBUTING.md)
* [Release History](#history)
* [License](#license)

<a name="overview"></a>
## Overview
The markdownlint grunt plugin enables to run rule based linting on your project markdown files.

See [markdownlint](https://github.com/DavidAnson/markdownlint) for more information.

For linting rules, please see [Rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md) document.

<a name="usage"></a>
## Usage
In order to use the markdownlint plugin, please use following example:

```js
//to use via grunt, first load the task
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
//or load it manually
grunt.loadNpmTasks('grunt-markdownlint');

grunt.initConfig({
  markdownlint: {
    example1: {
      options: {
        config: { //configure the linting rules
          'default': true,
          'line-length': false,
          'blanks-around-headers': false,
          'no-duplicate-header': false,
          'no-inline-html': false
        }
      },
      src: [
        'README.md',
        '.github/*.md'
      ]
    },
    example2: {
      options: {
        config: grunt.file.readJSON(rulesFile) //read linting rules from file
      },
      src: [
        'README.md',
        '.github/*.md'
      ]
    }
  }
});

grunt.registerTask('default', ['markdownlint:example1']);
```

The different options are defined in the markdownlint [api](https://github.com/DavidAnson/markdownlint#api) documentation.

<a name="installation"></a>
## Installation
In order to use this library, just run the following npm install command:

```sh
npm install --save-dev grunt-markdownlint
```

## API Documentation
See full docs at: [API Docs](docs/api.md)

## Contributing
See [contributing guide](.github/CONTRIBUTING.md)

<a name="history"></a>
## Release History

| Date        | Version | Description |
| ----------- | ------- | ----------- |
| 2022-12-28  | v3.1.6  | Upgrade markdownlint version |
| 2022-08-06  | v3.1.5  | Upgrade markdownlint version |
| 2022-01-04  | v3.1.4  | Upgrade markdownlint version |
| 2021-08-24  | v3.1.3  | Upgrade markdownlint version |
| 2021-02-08  | v3.1.2  | Upgrade markdownlint version |
| 2020-11-26  | v3.1.1  | Upgrade markdownlint version |
| 2020-09-22  | v3.1.0  | Upgrade markdownlint version |
| 2020-05-11  | v3.0.0  | Migrate to github actions and upgrade minimal node version |
| 2020-04-13  | v2.10.0 | Upgrade markdownlint version |
| 2018-06-07  | v2.0.0  | Upgrade markdownlint and minimal node version |
| 2018-05-29  | v1.1.6  | Upgrade markdownlint version |
| 2016-11-04  | v1.0.11 | Support new markdownlint 0.3.0 options |
| 2016-07-01  | v0.1.0  | Updated task config to use options |
| 2016-06-14  | v0.0.5  | Initial release |

<a name="license"></a>
## License
Developed by Sagie Gur-Ari and licensed under the Apache 2 open source license.
