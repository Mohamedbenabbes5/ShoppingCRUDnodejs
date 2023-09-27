const mongoose = require("mongoose")
const bcrypt=require("bcrypt")

var shemaregister=mongoose.Schema(
{
    
    email:String,
    name:String,
    password:String
}

)
var User=mongoose.model("user",shemaregister)
var url="mongodb://localhost:27017/shopping"


exports.RegisterFunctionModel=(name,email,password)=>{

return new Promise((resolve,reject)=>{

mongoose.connect(url)
.then(()=>{return User.findOne({email:email})})
.then( (user)=>{
    if (user){
        mongoose.disconnect()
        reject("email exist deja !!")
    }
    else{
        return bcrypt.hash(password,10)
    }
    
})
.then(
    (hpassword)=>{
     let user=new User({
         email:email,
        name:name,
        password:hpassword
     }
     )  
       return user.save()

    }
)
.then(
    (user)=>{
        mongoose.disconnect()
        resolve("Registred")

    }
)
.catch(
    (err)=>reject(err)
)

}
)


}

exports.LoginFunctionModel=(email,password)=>{

return new Promise((resolve,reject)=>{

mongoose.connect(url)
.then(
    ()=>{return User.findOne({email:email})}
)
.then(
    (user)=>{
        if (user)
        {
        bcrypt.compare(password,user.password).then(
            (verif)=>{

                if (verif)
                {mongoose.disconnect()    
                      console.log("User ID:", user._id);

                   resolve(user._id)}
                else{
                    mongoose.disconnect()
                    reject("invalid password")
                }
            }
            
        )
        }
        else{
            mongoose.disconnect()
           reject("invalid user in data base ")

        }
    }
)

.catch(
    (err)=>{reject(err)}
)

})
}