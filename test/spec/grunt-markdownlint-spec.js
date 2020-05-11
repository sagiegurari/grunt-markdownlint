'use strict';

const chai = require('chai');
const assert = chai.assert;
const task = require('../../tasks/grunt-markdownlint');

describe('Grunt Markdownlint', function () {
    it('register', function (done) {
        let registerCalled = false;
        let okCalled = false;

        const grunt = {
            registerMultiTask(name, taskFunc) {
                assert.equal(name, 'markdownlint');
                assert.isFunction(taskFunc);

                registerCalled = true;
            },
            options() {
                return {};
            },
            async() {
                return function (valid) {
                    assert.isTrue(valid);
                    assert.isTrue(okCalled);

                    done();
                };
            },
            log: {
                ok() {
                    okCalled = true;
                }
            },
            util: {
                pluralize(number, message) {
                    assert.isNumber(number);
                    assert.isDefined(message);
                }
            }
        };

        const taskFunction = task(grunt);

        assert.isTrue(registerCalled);
        assert.isFunction(taskFunction);

        taskFunction.call(grunt);
    });
});
