'use strict';

const chai = require('chai');
const assert = chai.assert;
const Linter = require('../../tasks/linter');

describe('Linter', function () {
    describe('run', function () {
        const grunt = {
            log: {
                ok(message) {
                    assert.isDefined(message);
                }
            },
            util: {
                pluralize(number, message) {
                    assert.isNumber(number);
                    assert.isDefined(message);
                }
            },
            fail: {
                warn() {
                    assert.fail();
                }
            }
        };

        const create = function (data, filesSrc) {
            const linter = new Linter();

            linter.options = function (options) {
                assert.deepEqual(options, {});

                return data || {};
            };

            linter.filesSrc = filesSrc;

            return linter;
        };

        it('no data', function (done) {
            let lintCalled = false;
            const linter = create();

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
                    files: [],
                    config: undefined
                });

                callback();
            });
        });

        it('empty data', function (done) {
            let lintCalled = false;
            const linter = create({});

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
                    files: [],
                    config: undefined
                });

                callback();
            });
        });

        it('files provided', function (done) {
            let lintCalled = false;
            const linter = create(undefined, [1, 2, 3]);

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
            let lintCalled = false;
            const linter = create({
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
                    files: [],
                    config: ['test', true, 5]
                });

                callback();
            });
        });

        it('strings provided', function (done) {
            let lintCalled = false;
            const linter = create({
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
                    files: [],
                    config: undefined,
                    strings: 'test string'
                });

                callback();
            });
        });

        it('frontMatter provided', function (done) {
            let lintCalled = false;
            const linter = create({
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
                    files: [],
                    config: undefined,
                    frontMatter: 'test frontMatter'
                });

                callback();
            });
        });

        it('lint error', function (done) {
            let lintCalled = false;
            let warnCalled = false;
            const linter = create();

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(warnCalled);
                    assert.isFalse(valid);

                    done();
                };
            };

            linter.run({
                fail: {
                    warn() {
                        assert.isTrue(lintCalled);
                        warnCalled = true;
                    }
                }
            }, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: [],
                    config: undefined
                });

                callback(new Error('test'));
            });
        });

        it('lint result data', function (done) {
            let lintCalled = false;
            let warnCalled = false;
            let toStringCalled = false;
            const linter = create();

            linter.async = function () {
                return function (valid) {
                    assert.isTrue(warnCalled);
                    assert.isTrue(valid);

                    done();
                };
            };

            linter.run({
                fail: {
                    warn() {
                        assert.isTrue(lintCalled);
                        assert.isTrue(toStringCalled);
                        warnCalled = true;
                    }
                }
            }, function (options, callback) {
                lintCalled = true;

                assert.deepEqual(options, {
                    files: [],
                    config: undefined
                });

                callback(null, {
                    toString() {
                        toStringCalled = true;

                        return 'test error';
                    }
                });
            });
        });
    });
});
