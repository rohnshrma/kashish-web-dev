function ageCheck(age){
    return new Promise((resolve , reject)=>{

        setTimeout(()=>{
            if (age >= 18){
                resolve("Eligible")
            }else{
                reject("Not Eligible")
            }
        }, 5000)

    })
}





async function requestHandler (age){
    try{
    const data =  await ageCheck(age)
    console.log(data)
    }
    catch(err){
        console.log(err)
    }
}


requestHandler(23)
requestHandler(24)
requestHandler(25)
requestHandler(21)