//函数组合  调试
// NEVER SAY DIE -->  never-say-die

const _ = require('lodash')

const  trace = _.curry((tag, v)=>{
    console.log(tag,v);
    return v
})

//_.split()

const split = _.curry((sep,str)=> _.split(str,sep));

const join = _.curry((sep, array) => _.join(array,sep))

const map = _.curry((fn, array) => _.map(array, fn))


const f = _.flowRight(join('-'), trace('map'), map(_.toLower), trace("split"), split(' '))

console.log(f('NEVER SAY DIE'))