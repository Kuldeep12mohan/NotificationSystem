
import { io } from "../app.js";

const placeOrder = async(req,res)=>
{
  const {user} = req.body;
  console.log(user);
  io.emit('newOrder',user);
  res.status(200)
  .json({
    message:'order placed successfully'
    }) 
}
export {
  placeOrder
}