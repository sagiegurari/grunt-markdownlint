'use strict';

const chai = require('chai');
const assert = chai.assert;
const task = require('../../');

describe('Index Tests', function () {
    it('task loading', function () {
        assert.isFunction(task);
    });
});
