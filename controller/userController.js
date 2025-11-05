
import products from '../models/productSchema.js'
import cart from '../models/cartSchema.js';
import orders from '../models/orderSchema.js';
import Categories from '../models/categorySchema.js';


//////////////////////////// user get product //////////////////////////////////////////////

export async function userGetProduct(req, res) {
    try {

        const showProducts = await products.find({})
        
        
        if (!showProducts) {
            return res.status(404).json('something wrong')
        }
        return res.status(200).json(showProducts)
    } catch (err) {
        console.log(err);

    }

}

/////////////////////////////// details about specific product //////////////////////////////

export async function userGetProductDetail(req, res) {
    try {

        const id = req.params.id

        const productDetails = await products.findById(id)

        if (!productDetails) {
            return res.status(404).json('something wrong')
        }
        return res.status(200).json(productDetails)
    } catch (err) {
        console.log(err);

    }
}


////////////////////////////// User get category ///////////////////////////////////////////

export async function userGetCategory(req, res) {

    try {
        const showCategories = await Categories.find()
        if (!showCategories) {
            return res.status(404).json('something went wrong')
        }
        return res.status(200).json(showCategories)

    } catch (err) {
        console.log(err);

    }
}

/////////////////////////////// post Cart //////////////////////////////////////////////////////

export async function postCart(req, res) {

    try {

        const { productId, quantity } = req.body;
        const  userId = req.session.user.id;



        if (!userId) {
            return res.status(404).json('error :user not found')
        }
        if (!productId) {
            return res.status(404).json('error :product not found')
        }
        if (!quantity) {
            return res.status(404).json('error :quantity not found')
        }

        const product = await products.findById(productId)
        if (!product) {
            return res.status(404).json('product not available')
        }


        let userCart = await cart.findOne({ userId })

        if (!userCart) {
            userCart = await cart.create({
                userId,
                items: []
            })
        }

        const qlty = Number(quantity)

        const item = userCart.items.find(i => i.productId.toString() === productId)
        if (item) {
            item.quantity += qlty;
        } else {
            userCart.items.push({ productId, quantity: qlty, price: product.price })
        }

        userCart.totalAmount = userCart.items.reduce((sum, i) => sum + i.quantity * i.price, 0)


        await userCart.save()
        await userCart.populate('items.productId')
        res.json('inserted successfull')

    } catch (err) {
        console.log(err);

    }

}

///////////////////////////////// put(update)cart ////////////////////////////////////////////////

    export async function putCart(req, res) {

        try {

            const id = req.params.id
            const { productId, action } = req.body

            const Cart = await cart.findOne({ _id: id }).populate("items.productId")
            console.log(Cart);

            if (!Cart) {
                return res.status(404).json('cart not found')
            }
            const item =  Cart.items.find(i => i.productId._id.toString() === productId)
            if (!item) {
                return res.status(404).json('product not found');
            }

            if (action === "increase") {
                item.quantity += 1
            } else if (action === "decrease" && item.quantity > 1) {
                item.quantity -= 1
            } else if (action === "decrease" && item.quantity === 1) {
                Cart.items = Cart.items.filter(i => i.productId._id.toString() !== productId)
            } else {
                res.json('not a specified action')
            }

            Cart.totalAmount = Cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0)

            await Cart.save()
            await Cart.populate("items.productId")

            res.status(200).json(Cart)


        } catch (err) {
            console.log(err);

        }

    }

/////////////////////////////////////// delete cart /////////////////////////////////////////////////////

export async function deleteCart(req, res) {
    try {
        const id = req.params.id
        const deleted = await cart.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json('no delete count')
        }
        return res.status(200).json('deleted')

    } catch (err) {
        console.log(err);

    }

}

////////////////////////////////// get(view)cart ///////////////////////////////////////////////////////////

export async function getCart(req, res) {
  try {
    const userCart = await cart
      .findOne({ user_id: req.session.user_id })
      .populate("items.productId");

    if (!userCart) {
      return res.status(200).json({ items: [], totalAmount: 0 });
    }

    console.log(userCart);
    res.status(200).json(userCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
}



///////////////////////////////// post(add)orders //////////////////////////////////////////////////////

export async function postOrders(req, res) {
    try {
        const userId = req.session.user.id
        

        const {paymentMethod} = req.body
        
        const cartfind = await cart.findOne({ userId: userId })
               console.log(cartfind);
        if (!cartfind) {
          
            
            return res.status(404).json("user has no cart ")
        }

        const order = await orders.create({
            userId: userId,
            items: cartfind.items,
            totalAmount: cartfind.totalAmount,
            paymentMethod: paymentMethod

        })
        return res.status(200).json(order)

    } catch (err) {
        console.log(err);

    }


}

/////////////////////////////////////////// get user order /////////////////////////////////////////////////

export async function getOrder(req, res) {

    try {

        const userId = req.session.user.id
        if(!userId){
        return res.status(401).json("User not logged in");
    }
     const userOrders = await orders
      .find({ userId })
      .populate("items.productId") 
      

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json("No orders found for this user");
    }

    res.status(200).json(userOrders);
        

    } catch (err) {
        console.log(err);

    }

}

//////////////////////////////// specific order ////////////////////////////////////////////////////////////

export async function specificOrder(req, res) {
    try {
        const id = req.params.id
        console.log(id);

        const find = await orders.findOne({ _id: id })

        if (!find) {
            return res.status(404).json("order is not found")
        }
        res.status(200).json(find);
    } catch (err) {
        console.log(err);

    }
}