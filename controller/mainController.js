import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'


//////////////////// main register /////////////////////////////////////

export async function postRegister(req,res){
    try{
        const {username,email,password,confirmPassword} =req.body;

        if (!username || !email || !password || !confirmPassword) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        const find = await User.findOne({email:email})
        if(find){
          return res.status(409).json({ message: 'User already exists' });
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' });
        }

      const hashPass = await bcrypt.hash(password,10)

      await User.create({

        username:username,
        email:email,
        password:hashPass

      })

      return res.status(201).json({ message: 'Registration successful' });
      
        


    }catch(err){
        console.log(err);
          return res.status(500).json({ message: 'Something went wrong' });
        
    }
}



/////////////////////////////////// main login(user) //////////////////////////////////////////////////////////

export async function postLogin(req,res){
  try{
    const {email,password} = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const store = await User.findOne({email:email})

    if(!store){
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isCorrect = await bcrypt.compare(password,store.password)


    if (!isCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = {
      username: store.username,
      email: store.email,
      role: store.role,
      id: store._id.toString()
    };

    return req.session.save((error) => {
      if (error) {
        return res.status(500).json({ message: 'Could not create login session' });
      }
      return res.status(200).json({ message: 'Login successful' });
    });

  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" });
    
  }

}

///////////////////////// logout user //////////////////////////////////////////////

export async function logoutUser(req,res) {
   try {
     req.session.destroy((err) => {
      if(err){
        console.error(err)
        return res.status(500).json("logout failed")
      }

      res.clearCookie('connect.sid')
      res.status(200).json("logout success");
     })
   } catch (error) {
    console.error(error)
   }  
  // req.session.destroy()
  // console.log(
  //   req.session

  // );
  
}

///////////////////////////////////////////// isLogin //////////////////////////////////////////////////////

export async function isLogin(req,res){
  try{
    if(!req.session.user){
      return res.status(200).json({login:false})
    }
    return res.status(200).json({login:true})

  }catch(err){
    console.error(err);
    return res.status(500).json({ login: false });
  }
}
