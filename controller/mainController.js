import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'


//////////////////// main register /////////////////////////////////////

export async function postRegister(req,res){
    try{
        const {username,email,password,repassword} =req.body;
        console.log(req.body)

        const find = await User.findOne({email:email})
        if(find){
          return res.json('user already existing')
        }

        if(password !== repassword){
            return res.json('enter same password')
        }

      const hashPass = await bcrypt.hash(password,10)

      const newUser = await User.create({

        username:username,
        email:email,
        password:hashPass

      })
      console.log(newUser);
      return res.json('successful')
      
        


    }catch(err){
        console.log(err);
          res.status(500).json('Something went wrong');
        
    }
}



/////////////////////////////////// main login(user) //////////////////////////////////////////////////////////

export async function postLogin(req,res){
  try{
    const {email,password} = req.body
    console.log(req.body);

    const store = await User.findOne({email:email})

    if(!store){
      return res.json('user not found')
    }
    
    const isCorrect = await bcrypt.compare(password,store.password)


    req.session.user = {
    
      username:store.username,
      email:store.email,
      role:store.role,
      id:store._id


    }
    if(isCorrect){
      return res.json('user loggin')
    }


  }catch(err){
    console.log(err)
    res.status(500).json("something went wrong")
    
  }

}

///////////////////////// logout user //////////////////////////////////////////////

export async function logoutUser(req,res) {
   try {
     req.session.destroy((err) => {
      if(err){
        console.error(err)
        res.status(500).json("logout failed")
      }
      res.status(200).json("logout success");
     })
   } catch (error) {
    console.error(error)
   }  
}

