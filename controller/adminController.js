import User from '../models/userSchema.js'
import products from '../models/productSchema.js'
import categories from '../models/categorySchema.js';
import orders from '../models/orderSchema.js';
import bcrypt from 'bcrypt'



//////////////////////////////////// main loggin(admin) /////////////////////////////////////////////

export async function postAdminlog(req, res) {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        const find = await User.findOne({ email: email })

        if (!find) {
            return res.json('admin not found');
        }
        const isCorrect = await bcrypt.compare(password, find.password)
        if (!isCorrect) {
            return res.status(500).json('wrong password')
        }

        req.session.admin = {

            username: find.username,
            email: find.email,
            role: find.role


        }

        return res.json('admin logging')
    }
    catch (err) {
        console.log(err)
        res.status(500).json("something went wrong")
    }
}


/////////////////////////////////// get users /////////////////////////////////////////

export async function getUsers(req, res) {

    try {
       
        const user = await User.find({})
        console.log(user);

        if (!user) {
            return res.status(404).json('no user found')
        }
        return res.status(200).json(user)

    } catch (err) {
        console.log(err);

    }
}

/////////////////////////////// post products ////////////////////////////////////

export async function postProduct(req, res) {
    try {
        const { name, description, price, category } = req.body
        console.log(req.body);

        const find = await products.findOne({ name: name })

        if (find) {
            return res.json("this product already exists")
        }

        const newUser = await products.create({
            name: name,
            description: description,
            price: price,
            image: image,
            category: category
        })
        console.log(newUser);
        return res.status(200).json('product inserted succcessful')



    } catch (err) {
        console.log(err);
        return res.status(404).json('something error')

    }
}


////////////////////////////////// put(update) product //////////////////////////////////

export async function putProduct(req,res) {
    const id = req.params.id

    const newUpdate = await products.findByIdAndUpdate(id,req.body,{new:true})
if(!newUpdate){
    return res.status(404).json('not updated count')
     
}
return res.status(200).json({
    message:`${newUpdate.name} is updated`,
    success:true

})

    
}

////////////////////////////////// delete products ///////////////////////////////////

export async function deleteProduct(req,res) {
    try{

    const id = req.params.id

    const deleted = await products.findByIdAndDelete(id)

    if(!deleted){
        return res.status(404).json('not delete count')
    }
    return res.status(200).json('deleted successful')
}catch(err){
    console.log(err);
    return res.status(404).json('something error')
    
}
}
//////////////////////////////////  get products /////////////////////////////////////

export async function getProduct(req, res) {
    try {
        const product = await products.find().populate('category')
        console.log(product);
        
        return res.status(200).json(product);
    } catch (error) {
        console.error(error)
        
    }
}


//////////////////////////////// post categories ////////////////////////////////////////////

export async function postCategory(req, res) {
    try {
        const { name, description } = req.body
        console.log(req.body);

        const findCategory = await categories.findOne({ name: name })

        if (findCategory) {
            return res.status(404).json('category already exists')
        }

        const newCategory = await categories.create({

            name: name,
            description: description

        })
        console.log(newCategory);
        return res.status(200).json({ message: 'categories add successful', name: name })

    } catch (err) {
        console.log(err);

    }
}

////////////////////////////////  get category ////////////////////////////////////////////

export async function getCategory(req,res) {
    try {

        const find = await categories.find({})

        if (find) {
        return res.status(200).json(find)
        }
        

    } catch (err) {
        console.log(err);
        return res.status(404).json('something error')

    }
}

///////////////////////////// put(update)category ////////////////////////////////////////////

export async function putCategory(req,res) {

    try{
        const id =req.params.id
        const update = await categories.findByIdAndUpdate(id,req.body,{new:true})

    if(update){

        return res.status(200).json({
            message:`${update.name} is updated`,
            success:true
        })
    } else {
            res.json("not updated count");
    }

    }catch(err){
        console.log(err);
        
    }
    
}

///////////////////////////////// delete category ///////////////////////////////////////////////////////////////

export async function deleteCategory(req,res) {
    try{
    const id = req.params.id
    const deleted = await categories.findByIdAndDelete(id)

    if(!deleted){
        return res.status(404).json('not delete count')
    }
    return res.status(200).json('deleted')
    
}catch(err){
    console.log(err);
    return res.status(404).json('something wrong')
    
}
}

////////////////////////////////////////// Admin orders ////////////////////////////////////////////////////////

export async function getAdminOrders(req,res) {
    try{

        const order = await orders.find({})
        if(!order){
            return res.status(404).json('not found any order')
        }
            return res.status(200).json(order)
        
   }catch(err){
    console.log(err);
    
   }
}

/////////////////////////////// admin order updates //////////////////////////////////////////////////////////////////
 

export async function putOrders(req,res) {
    try{
        const id = req.params.id

        const found = await orders.findByIdAndUpdate(id,req.body,{new:true})

        if(!found){
            return res.status(404).json('found any orders')
        }
              return res.status(200).json(found)


    }catch(err){
        console.log(err);
        
    }
}

////////////////////////////// admin order delete //////////////////////////////////////////////////////////////////////

export async function deleteOrder(req,res) {
    try{
       
        const id = req.params.id
        const deleted = await orders.findByIdAndDelete(id)
        if(!deleted){
            return res.status(404).json('no delete count')
        }
              return res.status(200).json('deleted successfully')
    }catch(err){
        console.log(err);
        
    }
}
    