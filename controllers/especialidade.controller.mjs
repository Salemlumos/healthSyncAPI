import Functions from "../functions/index.mjs"
import { db } from "../services/database.mjs"
import Response from "./response.controller.mjs"
export default class EspecialidadeController{

    Id=''
    Nome=''

    constructor(body){
        const {Id,Nome} = body
        this.Id=Id
        this.NomeEmail=Nome
      
      }

      async getAll(){
        const resEsp = await db.searchAll('especialidadesMedicas');
        console.log(resEsp)
        return resEsp
      }
      async create(Nome){
        const resEsp = await db.insertEspecialidade('especialidadesMedicas',{Nome});
        console.log(resEsp)
        return resEsp
      }
      async update(id,data){
        const resEsp = await db.updateDocument('especialidadesMedicas',id,data);
        console.log(resEsp)
        return resEsp
      }
      async delete(id){
        const resEsp = await db.deleteDocument('especialidadesMedicas',id);
        console.log(resEsp)
        return resEsp
      }

    //    async authUser(){
    //     console.log(this)
    //     const userRes = await db.searchUserByEmailAndPassword('usuario',this.Email,this.Senha)
    //     if(userRes.data==null){
    //     return(new Response({message:'User Not Found',data:userRes}).getResponse());
    //     }
    //     console.log('perfil')
    //     console.log(userRes.id)
    //     console.log(Object.keys(userRes))
    //     const isAuthenticated = await Functions.comparePass(this.Senha,userRes.data.Senha)
    //     if(isAuthenticated){
    //       console.log({message:'User Found',data:userRes})
    //       return(new Response({message:'User Found',data:userRes}).getResponse());
    //     }else{
    //       return(new Response({message:'User Not Found',data:userRes}).getResponse());

    //     }
      
        
    // }
    //    async createUser(){  
    //         try {
    //           this.Senha = await Functions.encryptPass(this.Senha);
            
    //          const id = await  db.insertUser('usuario', Functions.mergeArraysToCreateObject(this))
    //           return(new Response({message:'User Created',data:id}).getResponse());
    //         } catch (error) {
    //           console.log(error); // Handle or log the error as needed
    //           return(new Response({status:400,message:error}).getResponse());

    //         }
     
    // }
    // async updateUser(id) {
    //   console.log('My id')
    //   console.log(id)
    //   try {
    //     this.Senha = await Functions.encryptPass(this.Senha);
    
    //     const updatedRows = await db.updateUser('usuario', id, Functions.mergeArraysToCreateObject(this));
    //     console.log('hdhdh')
    //     console.log(updatedRows)
    //     if (updatedRows.status=='ok') {
    //       return new Response({ message: 'User Updated', data: { id } }).getResponse();
    //     } else {
    //       return new Response({ status: 404, message: 'User not found' }).getResponse();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     return new Response({ status: 400, message: error }).getResponse();
    //   }
    // }
}