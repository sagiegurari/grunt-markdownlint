'use strict';

/*global describe: false, it: false */

var chai = require('chai');
var assert = chai.assert;
var task = require('../../tasks/grunt-markdownlint');

describe('Grunt Markdownlint', function () {
    it('register', function (done) {
        var registerCalled = false;
        var okCalled = false;

        var grunt = {
            registerMultiTask: function (name, taskFunc) {
                assert.equal(name, 'markdownlint');
                assert.isFunction(taskFunc);

                registerCalled = true;
            },
            options: function () {
                return {};
            },
            async: function () {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(okCalled);

                    done();
                };
            },
            log: {
                ok: function () {
                    okCalled = true;
                }
            },
            util: {
                pluralize: function (number, message) {
                    assert.isNumber(number);
                    assert.isDefined(message);
                }
            }
        };

        var taskFunction = task(grunt);

        assert.isTrue(registerCalled);
        assert.isFunction(taskFunction);

        taskFunction.call(grunt);
    });
});
