import express from 'express';
import EspecialidadeController from '../controllers/especialidade.controller.mjs';

const especialidadesRoutes = express.Router();



especialidadesRoutes.use(function (req, res, next) {

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
especialidadesRoutes.get('/',(req,res,next)=>{
    return  res.status(200).send("All input is required");
})
especialidadesRoutes.get('/getAll', async (req, res, next) => {
    try {
      const esp=new EspecialidadeController({})
      const result = await esp.getAll()
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
  especialidadesRoutes.post('/create', async (req, res, next) => {
    try {
     const {Nome} = req.body
     console.log(Nome)
      const result = await new EspecialidadeController({Nome:Nome,Id:''}).create(Nome)
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
  especialidadesRoutes.put('/update', async (req, res, next) => {
    try {
     const {Id,Data} = req.body
     console.log(Id)
     console.log(Data)
      const result = await new EspecialidadeController({Nome:'',Id:Id}).update(Id,Data)
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
  especialidadesRoutes.post('/delete', async (req, res, next) => {
    try {
     const {Id} = req.body
     console.log(Id)
      const result = await new EspecialidadeController({Nome:'',Id:Id}).delete(Id)
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


export default especialidadesRoutes;

