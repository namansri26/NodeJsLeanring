

const {checknumber, examSync, resolveAfter2Second} = require('./examples');

const testig = ()=>{
    checknumber(40, 20).then(result =>{
        console.log(result)
            checknumber(result, result+1).then(resultSecor =>{
                console.log(resultSecor);

            
            }).catch(error=>{
                console.log(error)
            })
    }).catch(error=>{
        console.log(error)
    })
    
    

    console.log("Last console");
    
}


const examTesting = async ()=>{
   console.log('before....')
   let result =  examSync(10, 20);
   console.log('after....', result)
}


const result = async function (){
       console.log('calling')
       const result1 =  await resolveAfter2Second().then(res=>{
        console.log(res, "bbb")
        return res
       })
       console.log(result1 , 'ooi')
       x= 10;
       console.log(x)

}
const object =  function (){
     const person = {
        name : "naman",
        age: 20,
        phone: 897880993,

     }
     console.log(typeof person.name)

}

// testig();
//examTesting();

//result();
object();


