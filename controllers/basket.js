const basketModel=require("../models/basket")

exports.basketControler=(req,res)=>{

basketModel.getallbasket().then(

(baskets)=>{

        //  console.log(baskets)
    res.render('index',{baskets:baskets,connectee:req.session.userId})

}

)

}


exports.onebasketControler=(req,res)=>{
let id=req.params.id
console.log(id) 
  basketModel.getOnebasket(id)
  .then((onebasket) => {
    if (!onebasket) {
        // Gérez ici le cas où le produit n'a pas été trouvé
        res.render('error', { msg: "Produit introuvable!!!!!!!!!!!" });
    } else {
        res.render('details', { basket: onebasket ,connectee:req.session.userId});
    }
})
.catch((err) => {
    // Gérez ici les erreurs de la base de données
    console.error(err)
    res.render('error', { msg: "Erreur de base de données" });


});

}
//***************ADD PRODUCT************* */

exports.getaddproductController=(req,res)=>{
res.render("addProduct",{connectee:req.session.userId,Emessage:req.flash("Emessage"),Smessage:req.flash("Smessage")})

}




exports.postaddproductController=(req,res)=>{
 
      // Gérez le fichier téléchargé ici via req.file
  // L'objet `req.file` contient des informations sur le fichier téléchargé.

  if (!req.file){
    // Gérez ici le cas où aucun fichier n'a été téléchargé
    res.status(400).send('Aucun fichier n\'a été téléchargé.')
  }
else{
  // Vous pouvez accéder aux propriétés du fichier via `req.file`
  const fileName = req.file.filename;
  const mimeType = req.file.mimetype;
  const fileSize = req.file.size/1024/1024; // Taille en octets

  
  // Dans cet exemple, nous renvoyons simplement une réponse avec le nom du fichier téléchargé.
  console.log(`Fichier téléchargé :\n filename:${fileName} \n  mimetype: ${mimeType} \n  size: ${fileSize}mo`);
basketModel.postaddproductModule(req.session.userId,req.body.productname, req.body.marque,req.body.model,req.body.price, req.body.description,fileName)
.then(
  (msg)=>{
    // console.log(msg)
    req.flash('Smessage',msg)
    res.redirect("/addproduct")
  }
)

.catch(err =>{
  req.flash('Emessage',err)
  res.redirect("/addproduct")

} 
  //  console.error(err)
   )

}


    }



    // ******update delete products ****


    exports.getmyproductsController= (req, res, next) => {

     basketModel.getallbasket(req.session.userId)
     .then(
      (baskets)=>{
        //  console.log(baskets)
        res.render('myProducts',{myproducts:baskets,connectee:req.session.userId,Eupdate:req.flash('Eupdate'),Supdate:req.flash('Supdate'),Edelete:req.flash('Edelete'),Sdelete:req.flash('Sdelete')})
      }
     )
      // res.render('myProducts',{connectee:req.session.userId})
    
    
    }
  //delete controller
     

      exports.deleteProductContoller= (req, res) => {
   let id=req.params.id
        basketModel.deleteProductModule(id)
        .then(
          result=>{
            req.flash("Sdelete",result)
            res.redirect("/myproducts")
          }
        )
        .catch(err=>{
          req.flash("Edelete",err)
          res.redirect("/myproducts")
      })
      }
//update 
//get old data prduct
      exports.gettOldProductContoller=(req,res)=>{
       idproduct=req.params.id
      //  console.log(idproduct)


       basketModel.getOnebasket(idproduct)
       .then(
        (product)=>{
      res.render("updateProduct",{connectee:req.session.userId, oldproduct:product})
        } )
        .catch(err=>{
          console.log(err)
        })
      

      }
//update data in data base
      exports.postupdateproductController=(req,res)=>{  
         let productId=req.params.id
        if (!req.file){
       
          console.log('Gérez ici le cas où on na pas modifier limaege , idprod=',productId) 
          basketModel.postupdateproductModule(productId,req.body.productname, req.body.marque,req.body.model,req.body.price, req.body.description,req.body.imageProd)
          .then(
            (msg)=>{
              req.flash('Supdate',msg)   
              res.redirect("/myProducts")
            }
          )
          
          .catch(err =>{
            req.flash('Eupdate',err)
            res.redirect("/myProducts")
          
          } )

        }
      else{
        console.log('Gérez ici le cas où on na modifier limaege , idprod=',productId) 

        const fileName = req.file.filename;
  
        
      basketModel.postupdateproductModule(productId,req.body.productname, req.body.marque,req.body.model,req.body.price, req.body.description,fileName)
      .then(
        (msg)=>{
           req.flash('Supdate',msg)   
          res.redirect("/myProducts")
        }
      )
      
      .catch(err =>{
        req.flash('Eupdate',err)
        res.redirect("/myProducts")
      
      } 
       
         ) 
      }
    }