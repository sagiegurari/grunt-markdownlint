'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        jsdoc2md: 'grunt-jsdoc-to-markdown'
    });

    var options = {
        BuildConfig: {
            libDirectory: 'tasks',
            testDirectory: 'test',
            targetDirectory: 'target'
        },
        config: {
            src: 'project/build/*.js'
        }
    };

    var configs = require('load-grunt-configs')(grunt, options);
    grunt.initConfig(configs);
};
