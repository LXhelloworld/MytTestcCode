const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function ajax (url){
    return new Promise((resolve,reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('GEt',url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if(this.status == 200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        xhr.send();
    })
}

 ajax('./test.json').then((res) => {
     console.log('1111')
 })