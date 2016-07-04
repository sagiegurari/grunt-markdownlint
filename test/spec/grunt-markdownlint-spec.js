'use strict';

/*global describe: false, it: false */

var chai = require('chai');
var assert = chai.assert;
var task = require('../../tasks/grunt-markdownlint');

describe('Grunt Markdownlint Tests', function () {
    it('regsiter test', function (done) {
        var registerCalled = false;

        var taskFunction = task({
            registerMultiTask: function (name, taskFunc) {
                assert.equal(name, 'markdownlint');
                assert.isFunction(taskFunc);

                registerCalled = true;
            }
        });

        assert.isTrue(registerCalled);
        assert.isFunction(taskFunction);

        taskFunction.call({
            options: function () {
                return {};
            },
            async: function () {
                return function (valid) {
                    assert.isTrue(valid);

                    done();
                };
            }
        });
    });
});
