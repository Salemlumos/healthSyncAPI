import express from 'express';
import UserController from '../controllers/user.controller.mjs';

const userRoutes = express.Router();



userRoutes.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});
userRoutes.get('/',(req,res,next)=>{
    return  res.status(200).send("All input is required");
})
userRoutes.post('/auth',async(req,res,next)=>{
   console.log('body')
   console.log(req.body)
   const user=new UserController(req.body)
   const authUser = await user.authUser()
   return  res.status(200).json(authUser);
})
userRoutes.post('/register',async(req,res,next)=>{
   const user=new UserController(req.body)
   const createdUser = await user.createUser()
   return  res.status(200).json(createdUser);
})
userRoutes.post('/update',async(req,res,next)=>{
   const {id} = req.body
   const user=new UserController(req.body)
   const updatedUser = await user.updateUser(id)
   return  res.status(200).json(updatedUser);
})
userRoutes.get('/getAll',async(req,res,next)=>{
   const user=new UserController({})
   const resUser = await user.getAll()
   return  res.status(200).json(resUser);
})


export default userRoutes;

