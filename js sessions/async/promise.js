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


ageCheck(23)
.then(data => console.log(data) )
.catch(err => console.log(err))
ageCheck(11)
.then(data => console.log(data) )
.catch(err => console.log(err))
ageCheck(24)
.then(data => console.log(data) )
.catch(err => console.log(err))
ageCheck(25)
.then(data => console.log(data) )
.catch(err => console.log(err))
