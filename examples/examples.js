function checknumber(a, b) {
    return new Promise((resolve, reject) => {

        if (a > b) {
            resolve(a + b)
        }
        else {
            reject(a - b);
        }
    })
}


async function examSync(a, b) {
    for (let index = 0; index < 400; index++) {

        console.log(index)
    }
    if (a > b) {
        return (a + b)
    }
    else {
        return (a - b)

    }
}

function resolveAfter2Second(){
return new Promise((resolve, result) => {
    setTimeout(() => {
        resolve('100')
    }, 2000);
})

}

module.exports = { checknumber, examSync , resolveAfter2Second };