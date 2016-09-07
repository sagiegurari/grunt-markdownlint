'use strict';

module.exports = function (grunt) {
    //load markdownlint task
    grunt.loadTasks('tasks');

    var commons = require('js-project-commons');

    return commons.grunt.project(grunt);
};
