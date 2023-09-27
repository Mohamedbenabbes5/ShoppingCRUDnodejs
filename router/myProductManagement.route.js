
const express= require("express")

const router=express.Router()

const  GardAuth  = require("../controllers/gardAuth")

const basketControler=require("../controllers/basket")


const multer=require("multer") 





const fileStorage =multer.diskStorage(
    {
destination:(req,file,cb)=>{  
    cb(null,"assets/uploads") //1er parm -> null : une éventuelle erreur (null s'il n'y en a pas)
                             //2eme parm ->  le chemin vers le répertoire de destination !! Le répertoire 'uploads' doit être créé au préalable
},
//req;request 
//file: l'objet de fichier téléchargé
//os callback fct 
filename:(req,file,cb)=>{
    cb(null,Date.now()+''+file.originalname)//2eme parm -> nom de fichier souhaité renommer pour le fichier téléchargé.
},
   }
)

const upload=multer(
    {
storage:fileStorage
    }
)
//add product requests 
router.get("/addproduct",GardAuth.productGardAuthFunction,basketControler.getaddproductController)

router.post("/addproduct",upload.single('imageProd'),basketControler.postaddproductController)



//get myproducts list
router.get("/myproducts",GardAuth.productGardAuthFunction,basketControler.getmyproductsController)

// delete products
router.get("/myproducts/delete/:id",basketControler.deleteProductContoller)

// update products

router.get("/myproducts/update/:id",basketControler.gettOldProductContoller)

router.post("/myproducts/update/:id",upload.single('imageProd'),basketControler.postupdateproductController)




module.exports=router