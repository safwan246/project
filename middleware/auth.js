export async function isAdmin(req,res,next) {
    if(req.session.admin.role === "admin"){
       return next()
    }else{
        res.json('this page not for users')
    }

    
}
export async function isUser(req,res,next) {
    if(req.session.user.role === "user"){
        return next()
    }else{
        res.json('this page not for admin')
    }
    
}