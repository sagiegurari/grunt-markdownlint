'use strict';

module.exports = function (grunt) {
    grunt.registerTask('integration-test', 'Run integration tests', [
        'empty'
    ]);

    //load markdownlint task
    grunt.loadTasks('tasks');

    return {};
};
