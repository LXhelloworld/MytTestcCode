/* 
    1. EventLoop : 事件循环，监听调用栈和消息队列 协调调用栈和消息队列中事件的执行
    2. 消息队列 ：存放Api环境执行完的代办的任务
    3. 宏任务： 排在回调队列中的任务
    4. 微任务： 当前任务执行完立即执行的任务
*/

const fp = require('lodash/fp')


// 代码题 一 将下面异步代码使用Promise的方式改进

// 问题所需代码
// setTimeout (function () { 
//     var a ='hello'
//     setTimeout (function () { 
//         var b = 'lagou'
//         setTimeout (function () {
//             var c = 'I▼U'
//             console.log(a + b + c)
//         },10)
//     },10)
// },10)

function p1 () {
    return new Promise((resolve ,reject) => {
        setTimeout (function () {
            var a = 'hello'
            resolve(a)
        },10)
    })
}
function p2 () {
    return new Promise((resolve ,reject) => {
        setTimeout (function () {
            var b = 'lagou'
            resolve(b)
        },10)
    })
}
function p3 () {
    return new Promise((resolve ,reject) => {
        setTimeout (function () {
            var c = 'I▼U'
            resolve(c)
        },10)
    })
}

//Promise.all([p1(), p2(), p3()]).then(result => console.log(result[0] + result[1] + result[2]))

//二、基于以下代码完成下面的四个练习

//数据

// horsepower 马力，dollar_ value价格， in_ stock库存

const cars = [
{ name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
{ name: 'Spyker C12 Zagato',horsepower: 650, dollar_value: 648000, in_stock: false },
{ name: 'Jaguar XKR-S', horsepower : 550,dollar_value: 132000, in_stock: false },
{ name: 'Audi R8', horsepower :525, dollar_value: 114200,in_stock: false },
{ name: 'Aston Martin One-77',horsepower: 750, dollar_value: 1850000 ,in_stock: true },
{ name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// let isLastInStock = function (cars) {
//     //获取最后一条数据
//     let last_car = fp.last (cars)
//     // 获取最后一条数据的in_ stock 属性值
//     return fp.prop( 'in_stock', last_car)
// }

//练习1

const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

//练习2

const isFirstName = fp.flowRight(fp.prop('name'), fp.first)

//练习3

let _average = function (xs) {

return fp. reduce( fp.add, 0, xs)

} // <-无须改动

const averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))

//练习4

let _underscore = fp.replace(/\W+/g, '_')//<-- 无须改动，并在sanitieNames中使用它
const sanitizeName = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower, fp.prop('name'))))


//三、基于下面提供的代码，完成后续的四个练习

//练习1:使用fp.add(x, y)和fp.map(f, x)创建一一个能让functor里的值增加的函数ex1

require('./support' )
const {Maybe, Container}  = require('./support')

let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
   return maybe.map(x => fp.map((fp.add(1)),x))._value
}

//练习2:实现-一个函数ex2，能够使用fp.first获取列表的第一一个元素

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    return xs.map(x => fp.first(x))._value
}

//练习3:实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母

let safeProp = fp.curry( function (x, o){
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert'}
let ex3 = () => {
    return safeProp('name', user).map(x => fp.first(x))._value
}

//练习4:使用Maybe重写ex4，不要有if语句

let ex4 = n => {
    return Maybe.of(n).map(x => parseInt(n))._value
}

//手写MyPromise的源码在promise文件夹
