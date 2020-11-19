//组合函数的原理
function compose (...args){
    return function(value){
        return args.reverse().reduce(function(acc,fn){
            return fn(acc)
        },value)
    }
}

const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase();

const f = compose(toUpper, first, reverse)

console.log(f(['noe','kkk','ddkf']))


