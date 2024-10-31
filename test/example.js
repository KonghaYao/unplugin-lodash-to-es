// 引入 lodash
import _ from 'lodash'
const lodash = _;
// 示例数组
const numbers = [5, 12, 8, 130, 44];

// 使用 lodash 的链式调用
const result = _.chain(numbers)
    .filter(n => n > 10)  // 过滤出大于 10 的数字
    .map(n => n * 2)      // 将这些数字乘以 2
    .sum()                // 求和
    .value();             // 获取最终结果

// 使用 lodash 的链式调用
const result1 = lodash.chain(numbers)
    .filter(n => n > 10)  // 过滤出大于 10 的数字
    .map(n => n * 2)      // 将这些数字乘以 2
    .sum()                // 求和
    .value();             // 获取最终结果

console.log(result, result1);  // 输出: 372


import { cloneDeep, filter } from 'lodash'
const a = {}
const b = cloneDeep(a)
console.log(a === b, filter)

import isEqual from 'lodash/isEqual';
import myIsArray from 'lodash/isArray';

const object1 = { 'a': 1, 'b': 2 };
const object2 = { 'a': 1, 'b': 2 };

console.log(isEqual(object1, object2), myIsArray([]));