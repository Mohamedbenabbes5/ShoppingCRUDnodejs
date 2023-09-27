const registerModel=require("../models/auth.model")
const loginModel=require("../models/auth.model")




//*******************register****************
exports.getRegisterPage=(req,res)=>{

    res.render("register",{connectee:req.session.userId,erreurMessage:req.flash("registerErreurFlash")})
}

exports.postRegisterData=(req,res)=>{

registerModel.RegisterFunctionModel(req.body.name,req.body.email,req.body.password)
.then(
    (msg)=>{
      // console.log(msg)
     req.flash("SuccessFlash",msg)
  res.redirect('/login')

    }
)
.catch(
  // (err)=> { res.render("register",{err:err})}
  (err)=>{
    //  console.error(err)
    req.flash("registerErreurFlash",err)
    
     res.redirect('/register')

    }
)
}

//*******************login****************
exports.getLoginPage=(req,res)=>{
  res.render('login',{connectee:req.session.userId,erreurMessage:req.flash("LoginErreurFlash"),successMessage:req.flash("SuccessFlash"),successlogout:req.flash('logoutSuccessFlash')})

}

exports.postLoginData=(req,res)=>{
  loginModel.LoginFunctionModel(req.body.email,req.body.password)
  .then((id)=>{
             req.session.userId=id// userId: Clé de session (Session Key) : généré par le système de gestion de sessions pour identifier de manière unique chaque session utilisateur
             console.log("connected ,id de session:",req.session.id)
             res.redirect("/")
  })
  .catch(
    (err)=>{
      console.log(err)
      req.flash("LoginErreurFlash",err)
      res.redirect("/login")
    }
  )
}


//***********partie logout************

exports.LogoutFunctionController=(req,res)=>{

      req.flash('logoutSuccessFlash','vous etes déconnecté avec succées')
     console.log(req.flash('logoutSuccessFlash'))
     

  req.session.destroy((err) => {    //req.session.destroy(callback);
    if (err) { 
      console.error("Erreur lors de la déconnexion :", err);
    } else {
      // La session a été détruite avec succès, effectuez des actions supplémentaires ici
      res.redirect("/login")
    }
  });
}
// la fonct(callback) passée à req.session.destroy prend généralement 1 seul paramètre, 
// qui est l'erreur en cas d'échec de la destruction de la session. Si la destruction de la session réussit, le paramètre d'erreur sera null.