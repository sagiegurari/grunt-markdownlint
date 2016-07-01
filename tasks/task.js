'use strict';

var markdownlint = require('markdownlint');

/**
 * Exposes the markdown linting task as a function.
 *
 * @author Sagie Gur-Ari
 * @class Task
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
function Task() {
    this.lint = markdownlint;
}

/**
 * Runs the markdown linting task.
 *
 * @function
 * @memberof! Task
 * @public
 * @param {object} grunt - The grunt object
 * @param {object} data - All raw user configured data
 * @param {Array} filesSrc - The src files to lint
 * @param {function} callback - Callback function invoked with true/false if valid linting result
 */
Task.prototype.runMarkdownLint = function (grunt, data, filesSrc, callback) {
    var self = this;

    data = data || {};

    //set mandatory options
    var options = {
        files: filesSrc,
        config: data.config
    };

    //add optional options
    ['strings', 'frontMatter'].forEach(function addOption(option) {
        if (data[option]) {
            options[option] = data[option];
        }
    });

    self.lint(options, function onLintDone(error, result) {
        var resultString = error || ((result || '').toString());
        if (resultString) {
            grunt.fail.warn('\n' + resultString + '\n');
        }

        callback(!error || !resultString);
    });
};

module.exports = Task;
