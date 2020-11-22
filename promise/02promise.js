const { resolve } = require("path");

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        try{
            executor(this.resolve, this.reject)
        }catch(e){
            this.reject(e)
        }
    };
    //promise的状态
    status = PENDING;

    value = undefined;

    reason = undefined;
    //成功的回调
    successCallBack = [];
    //失败的回调
    failCallBack = [];


    resolve = (value) => {
        //如果状态不是等待，组织程序向下执行
        if(this.status !== PENDING) return
        //将状态改为成功
        this.status = FULFILLED;
        
        this.value = value;
        //当successCallBack存在时
        //this.successCallBack && this.successCallBack(this.value);
        while(this.successCallBack.length) this.successCallBack.shift()()
        
    };

    reject = (reason) => {
         //如果状态不是等待，组织程序向下执行
         if(this.status !== PENDING) return
        //将状态改为失败
        this.status = REJECTED

        this.reason = reason
        //当failCallBack存在时
        //this.failCallBack && this.failCallBack(this.reason)
        while(this.failCallBack.length) this.failCallBack.shift()()
    };

    then (successCallBack,failCallBack) {
        successCallBack = successCallBack? successCallBack : value => value
        failCallBack = failCallBack ? failCallBack : reason => {throw reason}
        let promise2 = new MyPromise((resolve, reject) => {
            //判断状态
            if(this.status == FULFILLED){
                setTimeout(() => {
                    try{
                        let x = successCallBack(this.value)
                        resolvePromise(promise2, x, resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)
            }else if(this.status == REJECTED){
                setTimeout(() => {
                    try{
                        let x = failCallBack(this.reason)
                        resolvePromise(promise2, x, resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)
            }else{
                //当状态为pending
                this.successCallBack.push(() => {
                    setTimeout(() => {
                        try{
                            let x = successCallBack(this.value)
                            resolvePromise(promise2, x, resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                });
                this.failCallBack.push(() => {
                    setTimeout(() => {
                        try{
                            let x = failCallBack(this.reason)
                            resolvePromise(promise2, x, resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                });
            }
        })
        return promise2
        
    };

    catch (failCallBack) {
        return this.then(undefined, failCallBack)
    }

    finally (callback) {
        this.then((value) => {
            callback()
            return value
        },(reason) => {
            callback()
            return reason
        })
    }

    static all (array) {
        let result = [];
        let index = 0
        return new MyPromise((resolve,reject) => {
            function addData (key, value) {
                result[key] = value
                index++
                if(index === array.length){
                    resolve(result)
                }
            }
            for(let i = 0; i < array.length; i++){
                let current = array[i]
                if(current instanceof MyPromise){
                    current.then(value => addData(i,value),reason => reject(reason))
                }else {
                    addData(i,array[i])
                }
            }
            
        })
    }
    static resolve (value) {
        if (value instanceof MyPromise) {
            return new MyPromise(resolve => resolve(value))
        }
    }
}

function resolvePromise (promise2, x, resolve, reject) {
    if(promise2 == x){
        return reject(new TypeError('llllll'))
    }
    if(x instanceof MyPromise){
        x.then(resolve,reject)
    } else {
        resolve(x)
    }
}

module.exports = MyPromise;