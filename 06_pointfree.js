//point free
//Hello World => hello_world


const  fp = require('lodash/fp')

const f = fp.flowRight(fp.join('_'), fp.map(fp.toLower), fp.split(' '))


console.log(f('Hello World'))