const express=require("express")

const app=express()

const path =require("path")

const basketControler=require("./controllers/basket")
const registerControler=require("./controllers/auth.controller")
const logoutController=require("./controllers/auth.controller")
const session=require("express-session") 
const  GardAuth  = require("./controllers/gardAuth")
const flash=require("connect-flash")


const myProductManagementRoute = require("./router/myProductManagement.route")
//module express-session ;permet de gerer les session des utilsateur coté serveur
/*
-> créer et de gérer des sessions utilisateur. Chaque session est associée à un utilisateur spécifique et
 stocke des données qui peuvent être utilisées pour suivre l'état et les préférences de cet utilisateur tout au long de sa visite sur le site web.
->gérer l'identification et l'authentification des utilisateurs. 
 il peut stocker un identifiant de session unique pour un utilisateur après une authentification réussie.
 ->Stockage de Données Temporaires
 ->créé les Cookies : En interne, express-session utilise généralement des cookies pour stocker l'identifiant de session sur le navigateur de l'utilisateur. 
 Cela permet au serveur de reconnaître l'utilisateur lorsqu'il effectue de nouvelles requêtes.
*/
const MongoDbStore=require("connect-mongodb-session")(session) // !!!! En utilisant "connect-mongodb-session" de cette manière, nous configurer "express-session" pour stocker les sessions dans une base de données MongoDB
/*
le module express-session-mongodb est une extension de express-session
qui permet de stocker les sessions utilisateur dans une base de données MongoDB plutôt que de les stocker en mémoire sur le serveur. 
Son utilité principale réside dans la persistance des sessions et la prise en charge d'applications web évolutives 
ce qui garantit que les données de session restent disponibles même en cas de redémarrage du serveur.*/

const bodyparser=express.urlencoded({extended:true})





app.use(express.static(path.join(__dirname,"assets")))
//ude flash
app.use(flash())


app.set("view engine","ejs")
app.set("views","views")

//session management

const Store=new MongoDbStore(
   {
       uri:"mongodb://localhost:27017/shopping", // L'URL de votre base de données MongoDB
       collection:"sessions"  // La collection dans laquelle stocker les sessions
   }
)

app.use(session(
   {
      secret:'this is my secret key',
      store:Store,
      resave:true,//Définit si la session doit être enregistrée à chaque requête, même si elle n'a pas changé
      saveUninitialized:true,//Indique si la session doit être enregistrée même si elle est vide. 
      cookie:{
         maxAge:1000*60*60 //age du cookies en ms, sinon il vas etre suprimer lors du fermeture du browser
      }
   }
))


//request
app.get("/",basketControler.basketControler)

app.get("/index",basketControler.basketControler)

 app.get("/men/:id",GardAuth.productGardAuthFunction,basketControler.onebasketControler)

 //register
 app.get("/register",GardAuth.GardAuthFunction,registerControler.getRegisterPage)

app.post("/register",bodyparser,registerControler.postRegisterData)

//login

   app.get("/login",GardAuth.GardAuthFunction, registerControler.getLoginPage)
   app.post("/login",bodyparser, registerControler.postLoginData)

//logout
app.post("/logout",logoutController.LogoutFunctionController)



//management product(add ,update ,delate product)

app.use("/",myProductManagementRoute)
// app.get("/addproduct",GardAuth.productGardAuthFunction,basketControler.getaddproductController)
// app.post("/addproduct",GardAuth.productGardAuthFunction,basketControler.postaddproductController)













//contact
app.get("/contact",(req,res)=>{
        res.render("contact",{connectee:req.session.userId})
               })

// app.get("/allproducts",(req,res)=>{
   
//         res.render("allProducts",{connectee:req.session.userId})
// })





// app.listen(3000,()=>{

// console.log("connected to server with port 3000")
// })
const port=process.env.PORT || 9001;
app.listen(port,()=>console.log("connected to server with port",port))