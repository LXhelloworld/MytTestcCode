//柯里化案例

const _ = require('lodash');
const match = _.curry((req, str)=>{
    return str.match(req)
})

const haveSpace = match(/\s+/g);

const haveNumber = match(/\d+/g);

console.log(haveSpace('hello world'))
console.log(haveNumber('hello world'))