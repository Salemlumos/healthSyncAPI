import express from 'express';
import AgendamentoController from '../controllers/agendamento.controller.mjs';
const AgendamentoControllerRoutes = express.Router();



AgendamentoControllerRoutes.use(function (req, res, next) {

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
AgendamentoControllerRoutes.get('/',(req,res,next)=>{
    return  res.status(200).send("All input is required");
})
AgendamentoControllerRoutes.get('/getAll', async (req, res, next) => {
    try {
      const result = await AgendamentoController.getAll()
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
AgendamentoControllerRoutes.post('/get', async (req, res, next) => {
  const {id}= req.body  
  console.log(id)
  try {
      const result = await AgendamentoController.get(id)
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
AgendamentoControllerRoutes.post('/getUserAgen', async (req, res, next) => {
  const {id}= req.body  
  console.log(id)
  try {
      const result = await AgendamentoController.getUserEvents(id)
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
AgendamentoControllerRoutes.post('/getMedicAgen', async (req, res, next) => {
  const {id}= req.body  
  console.log(id)
  try {
      const result = await AgendamentoController.getMedicEvents(id)
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
AgendamentoControllerRoutes.post('/delete', async (req, res, next) => {
  const {id}= req.body  
  console.log(id)
  try {
      const result = await AgendamentoController.delete(id)
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
AgendamentoControllerRoutes.put('/update', async (req, res, next) => {
  const {Id,Data}= req.body  
  try {
      const result = await AgendamentoController.update(Id,Data)
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
AgendamentoControllerRoutes.post('/create', async (req, res, next) => {
  try {
    const {agendamento} = req.body
    const result = await AgendamentoController.create(agendamento)
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
//   especialidadesRoutes.put('/update', async (req, res, next) => {
//     try {
//      const {Id,Data} = req.body
//      console.log(Id)
//      console.log(Data)
//       const result = await new EspecialidadeController({Nome:'',Id:Id}).update(Id,Data)
//       // Assuming the code you want to search for is in req.body.code
//       console.log(result)
//      if (result.status === 'ok') {
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
//   especialidadesRoutes.post('/delete', async (req, res, next) => {
//     try {
//      const {Id} = req.body
//      console.log(Id)
//       const result = await new EspecialidadeController({Nome:'',Id:Id}).delete(Id)
//       // Assuming the code you want to search for is in req.body.code
//       console.log(result)
//      if (result.status === 'ok') {
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

export default AgendamentoControllerRoutes;

