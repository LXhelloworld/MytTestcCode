//柯里化案例

const _ = require('lodash');
const match = _.curry((req, str)=>{
    return str.match(req)
})

const haveSpace = match(/\s+/g);

const haveNumber = match(/\d+/g);

//console.log(haveSpace('hello world'))
// console.log(haveNumber('hello world'))

const filter = _.curry(function(func, arr){
    return arr.filter(func)
})

const array = ['jack 1','jack 2','jack3','jack4','jack 5','jack6'];

const findSpace = filter(haveSpace)

console.log(findSpace(array))