'use strict';

/*global describe: false, it: false */

var chai = require('chai');
var assert = chai.assert;
var Task = require('../../tasks/task');

describe('Task Tests', function () {
    describe('runMarkdownLint', function () {
        var grunt = {
            fail: {
                warn: function () {
                    assert.fail();
                }
            }
        };

        it('no data', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback();
            };

            task.runMarkdownLint(grunt, undefined, undefined, function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('empty data', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback();
            };

            task.runMarkdownLint(grunt, {}, undefined, function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('files provided', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: [1, 2, 3],
                    config: undefined
                });

                callback();
            };

            task.runMarkdownLint(grunt, undefined, [1, 2, 3], function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('config provided', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: ['test', true, 5]
                });

                callback();
            };

            task.runMarkdownLint(grunt, {
                config: ['test', true, 5]
            }, undefined, function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('strings provided', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined,
                    strings: 'test string'
                });

                callback();
            };

            task.runMarkdownLint(grunt, {
                strings: 'test string'
            }, undefined, function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('frontMatter provided', function (done) {
            var lintCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined,
                    frontMatter: 'test frontMatter'
                });

                callback();
            };

            task.runMarkdownLint(grunt, {
                frontMatter: 'test frontMatter'
            }, undefined, function (valid) {
                assert.isTrue(valid);
                assert.isTrue(lintCalled);

                done();
            });
        });

        it('lint error', function (done) {
            var lintCalled = false;
            var warnCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback(new Error('test'));
            };

            task.runMarkdownLint({
                fail: {
                    warn: function () {
                        assert.isTrue(lintCalled);
                        warnCalled = true;
                    }
                }
            }, undefined, undefined, function (valid) {
                assert.isTrue(warnCalled);
                assert.isFalse(valid);

                done();
            });
        });

        it('lint result data', function (done) {
            var lintCalled = false;
            var warnCalled = false;
            var toStringCalled = false;
            var task = new Task();

            task.lint = function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback(null, {
                    toString: function () {
                        toStringCalled = true;

                        return 'test error';
                    }
                });
            };

            task.runMarkdownLint({
                fail: {
                    warn: function () {
                        assert.isTrue(lintCalled);
                        assert.isTrue(toStringCalled);
                        warnCalled = true;
                    }
                }
            }, undefined, undefined, function (valid) {
                assert.isTrue(warnCalled);
                assert.isTrue(valid);

                done();
            });
        });
    });
});
