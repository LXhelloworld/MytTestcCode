/*
    1.Promise是一个类 在执行的时候需要传递一个执行器进去，执行器会立即执行
    2.Promise 中三种状态   成功 fulFilled 失败 rejected 待定  pending
      pending =>   fulfilled
      pending =>   rejected
      一旦状态确定就不可变了
    3.resolve和reject函数是用来改变状态的
      resolve: fulfilled
      reject: reject
    4.then方法内部做的事就是判断状态，then被定义在原型对象中
*/

const MyPromise = require('./02promise');


// new Promise((resolve, reject) =>{
//     resolve()
//     reject()
// })

let promise = new MyPromise((resolve, reject) => {
  // setTimeout(() =>{
  //   resolve('成功ok')
  //   //console.log(promise.value)
  // },2000)
  //throw new Error('执行器错误')
  //resolve('成功')
  //reject('失败')
})


function p1 () {
  return new MyPromise((resolve, reject) => {
    //resolve('成功p1')
    reject('失败')
  })
}

function p2 () {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功p2')
    }, 2000)
  })
}

function other () {
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
}

// promise.then(value => {
//   //throw new Error('成功回调出错错误')
//   console.log(value);
//   return 'aaa'
// }, reason => {
//   console.log(reason)
//   return 100
// }).then((value) => {
//   console.log(value)
// })


p1()
  .then(value => console.log(value))
  .catch(reason => console.log(reason))

// MyPromise.all(['a1','b2',p1(), p2(), 'c3']).then((result) => {
//   console.log(result)
// })

// p1.then((value) => {
//   console.log(value)
// }, reason => {
//   console.log(reason.message)
// })
