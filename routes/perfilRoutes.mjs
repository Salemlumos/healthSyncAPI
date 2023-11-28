import express from 'express';
import PerfilController from '../controllers/perfil.controller.mjs';

const perfilRoutes = express.Router();



perfilRoutes.use(function (req, res, next) {

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
perfilRoutes.get('/',(req,res,next)=>{
    return  res.status(200).send("All input is required");
})
perfilRoutes.get('/getAll', async (req, res, next) => {
    try {
      const perfil=new PerfilController({})
      const result = await perfil.getAll()
      // Assuming the code you want to search for is in req.body.code
     if (result.status === 'ok') {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    
  
      // Check the result and send the appropriate response
     
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        data: null,
        message: 'Internal Server Error',
      });
    }
  });
perfilRoutes.post('/code', async (req, res, next) => {
    try {
      console.log('body');
      console.log(req.body);
      const perfil=new PerfilController(req.body)
      const result = await perfil.getPerfil()
      // Assuming the code you want to search for is in req.body.code
      console.log("inside code")
      console.log(result)
     if (result.status === 200) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    
  
      // Check the result and send the appropriate response
     
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        data: null,
        message: 'Internal Server Error',
      });
    }
  });
  
  
  
  
  
// perfilRoutes.post('/register',async(req,res,next)=>{
//    const user=new UserController(req.body)
//    const createdUser = await user.createUser()
//    return  res.status(200).json(createdUser);
// })


export default perfilRoutes;

