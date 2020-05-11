'use strict';

/*jslint debug: true */
/*istanbul ignore next*/
/**
 * Exposes the markdown linting task.
 *
 * @author Sagie Gur-Ari
 * @class Linter
 * @public
 * @example
 * ````js
 * //to use via grunt, first load the task
 * require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
 * //or load it manually
 * grunt.loadNpmTasks('grunt-markdownlint');
 *
 * grunt.initConfig({
 *   markdownlint: {
 *     full: {
 *       options: {
 *         config: { //configure the linting rules
 *           'default': true,
 *           'line-length': false,
 *           'blanks-around-headers': false,
 *           'no-duplicate-header': false,
 *           'no-inline-html': false
 *         }
 *       },
 *       src: [
 *         'README.md',
 *         'docs/api.md'
 *       ]
 *     }
 *   }
 * });
 *
 * grunt.registerTask('default', ['markdownlint']);
 * ````
 */
function Linter() {
    //should not be called
}
/*jslint debug: false */

/**
 * Runs the markdown linting task.
 *
 * @function
 * @memberof! Linter
 * @public
 * @param {Object} grunt - The grunt object
 * @param {function} markdownlint - The markdownlint library
 */
Linter.prototype.run = function (grunt, markdownlint) {
    const self = this;

    const done = self.async();

    const data = self.options({});

    const files = self.filesSrc || [];
    const filesNumber = files.length;

    //set mandatory options
    const options = {
        files,
        config: data.config
    };

    //add optional options
    [
        'strings',
        'frontMatter',
        'resultVersion'
    ].forEach(function addOption(option) {
        if (data[option]) {
            options[option] = data[option];
        }
    });

    markdownlint(options, function onLintDone(error, result) {
        const resultString = error || (result || '').toString();

        if (resultString) {
            grunt.fail.warn('\n' + resultString + '\n');
        } else {
            grunt.log.ok(filesNumber + ' ' + grunt.util.pluralize(filesNumber, 'file/files') + ' lint free.');
        }

        done(!error || !resultString);
    });
};

module.exports = Linter;
