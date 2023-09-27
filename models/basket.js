const mongoose=require("mongoose")

var shemabasket=mongoose.Schema(
    {
       // _id: mongoose.Schema.Types.ObjectId, //ma faute :_id:String
description: String,
    model: String,
    price: Number,
    image: String,
    titre: String,
    marque: String,
    userId:    String,    
 
    }
)

var basket=mongoose.model('basket',shemabasket)
var url="mongodb://localhost:27017/shopping"

//
exports.getallbasket=(id=null)=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url)

        .then( ()=> {
            const query =id ? {userId:id}:{} ; //condition ? valeurSiVraie : valeurSiFausse
            return basket.find(query)   }  ) //basket.find({}) retourner tous les données du BD
        .then ((baskets)=>{
                   mongoose.disconnect()
                   resolve (baskets)
              })
        .catch(
                 err=> reject(err)
          )
   
   
       })

}


exports.getOnebasket=(id)=>{

    return new Promise((resolve,reject)=>{

     mongoose.connect(url)
     .then( ()=> { return basket.findById(id);}  ) //basket.find({}).limit(n) :retouner les n premiers documents du BD
    //  .then ((onebasket)=>{
    //             mongoose.disconnect()
    //             resolve (onebasket)
    //        })
    .then((onebasket) => {
        mongoose.disconnect();
        if (!onebasket) {
            reject(new Error("Produit introuvable"));
        } else {
            resolve(onebasket);
        }
    })
     .catch(
              err=> reject(err)
       )


    })
}

exports.postaddproductModule=(userId,productname, marque,model,price,description,image)=>{

return new Promise((resolve, reject)=>{

    mongoose.connect(url)
    .then(()=>{

        let product =new basket(
            {    
              

                description:description,
                model:model,
                price:price,
                image:image,
                titre:productname,
                marque:marque ,
               userId: userId,
            }
        )
        return product.save()
    })
    .then(()=>{

       mongoose.disconnect()
        resolve("product already added")

    })
    .catch(err => {
        mongoose.disconnect()
        reject(err)}
        )
})
}

exports.deleteProductModule=(id)=>{
return new Promise((resolve, reject)=>{

mongoose.connect(url)
.then(()=>{

    return basket.deleteOne({_id:id})
   
}) 
.then((result)=>{
    mongoose.disconnect()
        resolve("product already deleted")
    })
.catch((err)=>{
   reject("error deleting product")
})
})
}



//update product
exports.postupdateproductModule=(productId,productname, marque,model,price,description,image)=>{

    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url)
        .then(()=>{
// La méthode 'updateOne' prend deux arguments : le filtre pour trouver le document à mettre à jour et les modifications à apporter.
  // Dans cet exemple, nous utilisons l'ID (_id) pour filtrer le document.
  return basket.updateOne(
    { _id: productId }, // Filtrer par ID
    {
        titre: productname,
        marque: marque,
        model: model,
        price: price,
        description: description,
        image: image
    }
  );
})
        .then(()=>{
    
           mongoose.disconnect()
            resolve("product already updated")
    
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)}
            )
    })
    }