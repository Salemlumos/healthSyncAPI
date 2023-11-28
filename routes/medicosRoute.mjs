import express from 'express';
import MedicosController from '../controllers/medicos.controller.mjs';

const medicosRoute = express.Router();



medicosRoute.use(function (req, res, next) {

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
medicosRoute.get('/',(req,res,next)=>{
    return  res.status(200).send("All input is required");
})
medicosRoute.post('/getAll', async (req, res, next) => {
    try {
     const {id} = req.body
     console.log(id)
      const result = await MedicosController.getMedics(id)
      // Assuming the code you want to search for is in req.body.code
      console.log(result)
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
medicosRoute.get('/getAllMedics', async (req, res, next) => {
    try {
      console.log('medics')
      const result = await MedicosController.getAllMedics()
      // Assuming the code you want to search for is in req.body.code
      console.log(result)
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
medicosRoute.get('/getAllNonMedics', async (req, res, next) => {
    try {
      console.log('medics')
      const result = await MedicosController.getAllNonMedics()
      // Assuming the code you want to search for is in req.body.code
      console.log(result)
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
medicosRoute.post('/createMedic', async (req, res, next) => {
    try {
      const {userId,espId}= req.body
      console.log('medics')
      const result = await MedicosController.create(userId,espId)
      // Assuming the code you want to search for is in req.body.code
      console.log(result)
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
medicosRoute.post('/delete', async (req, res, next) => {
    try {
      const {id}= req.body
      console.log('medics')
      const result = await MedicosController.delete(id)
      // Assuming the code you want to search for is in req.body.code
      console.log(result)
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
// perfilRoutes.post('/code', async (req, res, next) => {
//     try {
//       console.log('body');
//       console.log(req.body);
//       const perfil=new PerfilController(req.body)
//       const result = await perfil.getPerfil()
//       // Assuming the code you want to search for is in req.body.code
//       console.log("inside code")
//       console.log(result)
//      if (result.status === 200) {
//         res.status(200).json(result);
//       } else {
//         res.status(404).json(result);
//       }
    
  
//       // Check the result and send the appropriate response
     
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({
//         status: 'error',
//         data: null,
//         message: 'Internal Server Error',
//       });
//     }
//   });
  
  
  
  
  
// perfilRoutes.post('/register',async(req,res,next)=>{
//    const user=new UserController(req.body)
//    const createdUser = await user.createUser()
//    return  res.status(200).json(createdUser);
// })


export default medicosRoute;

