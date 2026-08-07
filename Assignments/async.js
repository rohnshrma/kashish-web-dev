function ageCheck(age){

    return new Promise((resolve, reject)=>{

        setTimeout(() => {
            if(age >= 18){
                resolve("eligible");
            }else{
                reject("not Eligible")
            }
        }, 5000);
    })
}

async function requestHandler(age) {
    try{
        const data=  await ageCheck(age)
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}


requestHandler(22);