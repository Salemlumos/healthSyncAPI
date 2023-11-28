import Functions from "../functions/index.mjs"
import { db } from "../services/database.mjs"
import Response from "./response.controller.mjs"
export default class UserController{

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

       async authUser(){
        console.log(this)
        const userRes = await db.searchUserByEmailAndPassword('usuario',this.Email,this.Senha)
        if(userRes.data==null){
        return(new Response({message:'User Not Found',data:userRes}).getResponse());
        }
        console.log('perfil')
        console.log(userRes.id)
        console.log(Object.keys(userRes))
        const isAuthenticated = await Functions.comparePass(this.Senha,userRes.data.Senha)
        if(isAuthenticated){
          console.log({message:'User Found',data:userRes})
          return(new Response({message:'User Found',data:userRes}).getResponse());
        }else{
          return(new Response({message:'User Not Found',data:userRes}).getResponse());

        }
      
        
    }
       async createUser(){  
            try {
              this.Senha = await Functions.encryptPass(this.Senha);
            
             const id = await  db.insertUser('usuario', Functions.mergeArraysToCreateObject(this))
              return(new Response({message:'User Created',data:id}).getResponse());
            } catch (error) {
              console.log(error); // Handle or log the error as needed
              return(new Response({status:400,message:error}).getResponse());

            }
     
    }
    async updateUser(id) {
      console.log('My id')
      console.log(id)
      try {
        this.Senha = await Functions.encryptPass(this.Senha);
    
        const updatedRows = await db.updateUser('usuario', id, Functions.mergeArraysToCreateObject(this));
        console.log('hdhdh')
        console.log(updatedRows)
        if (updatedRows.status=='ok') {
          return new Response({ message: 'User Updated', data: { id } }).getResponse();
        } else {
          return new Response({ status: 404, message: 'User not found' }).getResponse();
        }
      } catch (error) {
        console.log(error);
        return new Response({ status: 400, message: error }).getResponse();
      }
    }
}