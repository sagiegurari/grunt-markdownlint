'use strict';

const Linter = require('./linter');

/**
 * Registers the markdown linting task.
 *
 * @function
 * @private
 * @param {Object} grunt - The grunt object
 * @returns {function} The task function
 */
module.exports = function registerTask(grunt) {
    const runTask = function runTask() {
        //load first time only when actually invoked
        const markdownlint = require('markdownlint');

        /*eslint-disable no-invalid-this*/
        Linter.prototype.run.call(this, grunt, markdownlint);
        /*eslint-enable no-invalid-this*/
    };

    grunt.registerMultiTask('markdownlint', runTask);

    return runTask;
};
