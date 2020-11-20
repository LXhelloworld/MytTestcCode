console.log('a')

setTimeout(() => {
    console.log('g')
}, 0)

Promise.resolve().then(() => {
    console.log('b')
}).then(() => {
    console.log('c')
}).then(() => {
    console.log('d')
}).then(() => {
    console.log('e')
})


console.log('f')