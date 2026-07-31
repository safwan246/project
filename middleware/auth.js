export async function isAdmin(req,res,next) {
console.log(req.session.admin);

    if(!req.session.admin){
         return res.status(401).json('this page not for users')
    }

    if(req?.session?.admin?.role === "admin"){
       return next()
    }else{
        return res.status(403).json('this page not for users')
    }
}
export async function isUser(req,res,next) {
    if(req?.session?.user?.role === "user"){
        return next()
    }else{
        return res.status(401).json('Login required')
    }
    
}
