const { get } = require('lodash');
const _ = require('lodash');

//lodash的试验
// const array = ['jack1','jack2','jack3','jack4','jack5','jack6'];

// console.log(_.first(array))
// console.log(_.toUpper(array))
// console.log(_.reverse(array))

function getSum(a, b, c){
    //return arguments; 顺便熟悉一下arguments
    return a + b + c;
}

//console.log(getSum(4,2,4));

const curried = curry(getSum);

console.log(curried(1,2,3))
console.log(curried(1,2)(5))

function curry(func){
    return function curriedFn(...args){
        //判断实参和形参的个数
        if(args.length <func.length){
            return function (){
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}