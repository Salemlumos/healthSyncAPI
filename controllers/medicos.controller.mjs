import Functions from "../functions/index.mjs"
import { db } from "../services/database.mjs"
import Response from "./response.controller.mjs"
export default class MedicosController{

    Cpf=''
    Email=''
    Nome=''
    PerfilFk=''
    Senha=''
    Telefone=''
    Sexo=''

    constructor(body){
        const {cpf,email,nome,perfilFk,senha,telefone,sexo} = body
        this.Cpf=cpf
        this.Email=email
        this.Nome=nome
        this.PerfilFk=perfilFk
        this.Senha=senha
        this.Telefone=telefone
        this.Sexo=sexo
      }

      static async getMedics(id) {
        try {
        // Assuming getMedicsByAreaId is a static method
          const result = await db.getMedicsByAreaId(id);
          
          if (result.status === 'ok') {
            return {
              status: 'ok',
              data: result.data,
              message: 'Medicos found',
            };
          } else {
            return {
              status: 'not ok',
              data: null,
              message: 'Medic not found',
            };
          }
        } catch (error) {
          console.error('Error in MedicosController.getMedics:', error);
          return {
            status: 'not ok',
            data: null,
            message: 'Internal Server Error',
          };
        }
      }
      static async delete(id) {
        try {
          // Assuming getMedicsByAreaId is a static method
          const result = await db.deleteDocument('medico',id);
          
          if (result.status === 'ok') {
            return {
              status: 'ok',
              data: result.data,
              message: 'Medicos deleted',
            };
          } else {
            return {
              status: 'not ok',
              data: null,
              message: 'Medic not found',
            };
          }
        } catch (error) {
          console.error('Error in MedicosController.getMedics:', error);
          return {
            status: 'not ok',
            data: null,
            message: 'Internal Server Error',
          };
        }
      }
      static async getAllMedics() {
        try {
          // Assuming getMedicsByAreaId is a static method
          const result = await db.getAllMedics();
          
          if (result.status === 'ok') {
            return {
              status: 'ok',
              data: result.data,
              message: 'Medicos found',
            };
          } else {
            return {
              status: 'not ok',
              data: null,
              message: 'Medic not found',
            };
          }
        } catch (error) {
          console.error('Error in MedicosController.getMedics:', error);
          return {
            status: 'not ok',
            data: null,
            message: 'Internal Server Error',
          };
        }
      }
      static async getAllNonMedics() {
        try {
          // Assuming getMedicsByAreaId is a static method
          const result = await db.getAllNonMedicUsers();
          
          if (result.status === 'ok') {
            return {
              status: 'ok',
              data: result.data,
              message: 'Non Medicos found',
            };
          } else {
            return {
              status: 'not ok',
              data: null,
              message: 'Non Medic not found',
            };
          }
        } catch (error) {
          console.error('Error in MedicosController.getAllNonMedics:', error);
          return {
            status: 'not ok',
            data: null,
            message: 'Internal Server Error',
          };
        }
      }
      static async create(userId,espId) {
        try {
          // Assuming getMedicsByAreaId is a static method
          const result = await db.insertMedico(espId,userId);
          
          if (result.status === 'ok') {
            return {
              status: 'ok',
              data: result.data,
              message: 'Medic added',
            };
          } else {
            return {
              status: 'not ok',
              data: null,
              message: 'Non Medic not found',
            };
          }
        } catch (error) {
          console.error('Error in MedicosController.insertMedico:', error);
          return {
            status: 'not ok',
            data: null,
            message: 'Internal Server Error',
          };
        }
      }
      
      
}