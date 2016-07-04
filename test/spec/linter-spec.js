'use strict';

/*global describe: false, it: false */

var chai = require('chai');
var assert = chai.assert;
var Linter = require('../../tasks/linter');

describe('Linter Tests', function () {
    describe('run', function () {
        var grunt = {
            fail: {
                warn: function () {
                    assert.fail();
                }
            }
        };

        var create = function (data, filesSrc) {
            var linter = new Linter();

            linter.options = function (options) {
                assert.deepEqual(options, {});

                return data || {};
            };

            linter.filesSrc = filesSrc;

            return linter;
        };

        it('no data', function (done) {
            var lintCalled = false;
            var linter = create();

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback();
            });
        });

        it('empty data', function (done) {
            var lintCalled = false;
            var linter = create({});

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback();
            });
        });

        it('files provided', function (done) {
            var lintCalled = false;
            var linter = create(undefined, [1, 2, 3]);

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: [1, 2, 3],
                    config: undefined
                });

                callback();
            });
        });

        it('config provided', function (done) {
            var lintCalled = false;
            var linter = create({
                config: ['test', true, 5]
            });

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: ['test', true, 5]
                });

                callback();
            });
        });

        it('strings provided', function (done) {
            var lintCalled = false;
            var linter = create({
                strings: 'test string'
            });

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined,
                    strings: 'test string'
                });

                callback();
            });
        });

        it('frontMatter provided', function (done) {
            var lintCalled = false;
            var linter = create({
                frontMatter: 'test frontMatter'
            });

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(lintCalled);

                    done();
                };
            };

            linter.run(grunt, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined,
                    frontMatter: 'test frontMatter'
                });

                callback();
            });
        });

        it('lint error', function (done) {
            var lintCalled = false;
            var warnCalled = false;
            var linter = create();

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(warnCalled);
                    assert.isFalse(valid);

                    done();
                };
            };

            linter.run({
                fail: {
                    warn: function () {
                        assert.isTrue(lintCalled);
                        warnCalled = true;
                    }
                }
            }, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: undefined,
                    config: undefined
                });

                callback(new Error('test'));
            });
        });

        it('lint result data', function (done) {
            var lintCalled = false;
            var warnCalled = false;
            var toStringCalled = false;
            var linter = create();

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(warnCalled);
                    assert.isTrue(valid);

                    done();
                };
            };

            linter.run({
                fail: {
                    warn: function () {
                        assert.isTrue(lintCalled);
                        assert.isTrue(toStringCalled);
                        warnCalled = true;
                    }
                }
            }, function (options, callback) {
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
            });
        });
    });
});
