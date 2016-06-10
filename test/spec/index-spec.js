'use strict';

/*global describe: false, it: false */

var chai = require('chai');
var assert = chai.assert;
var task = require('../../');

describe('Index Tests', function () {
    it('task loading', function () {
        assert.isFunction(task);
    });
});
