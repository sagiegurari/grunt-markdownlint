'use strict';

var Task = require('./task');

/**
 * Registers the markdown linting task.
 *
 * @function
 * @private
 * @param {object} grunt - The grunt object
 * @returns {function} The task function
 */
module.exports = function registerTask(grunt) {
    var task = new Task();

    /*eslint-disable no-invalid-this*/
    var runTask = function runTask() {
        var done = this.async();

        task.runMarkdownLint(grunt, done);
    };
    /*eslint-enable no-invalid-this*/

    grunt.registerMultiTask('markdownlint', runTask);

    return runTask;
};
