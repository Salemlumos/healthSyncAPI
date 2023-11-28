import Functions from "../functions/index.mjs"
import { db } from "../services/database.mjs"
import Response from "./response.controller.mjs"
export default class PerfilController{

    NomePerfil=''
    Slug=''
    Doc=''
   

    constructor(body){
        const {NomePerfil,Slug,Doc} = body
        this.Doc=Doc
        this.Slug=Slug
        this.NomePerfil=NomePerfil
    }


        async getPerfil(){
            const perfRes = await db.searchByCode("perfil",this.Doc)
            console.log("searching perfil by code")
            console.log(perfRes)
            return(new Response({message:perfRes.message,data:perfRes.data}).getResponse());

        }
        async getAll(){
            const perfRes = await db.searchAll("perfil")
            console.log("searching all data from perfil")
            console.log(perfRes)
            return(new Response({message:perfRes.message,data:perfRes.data}).getResponse());

        }
    //    async authUser(){
    //     console.log(this)
    //     const userRes = await db.searchUserByEmailAndPassword('usuario',this.Email,this.Senha)
    //     if(userRes.data==null){
    //         return
    //     }
    //     console.log('perfil')
    //     const isAuthenticated = await Functions.comparePass(this.Senha,userRes.data.Senha)
    //     console.log(isAuthenticated)
    //     console.log({message:'User Found',data:userRes})
    //     return(new Response({message:'User Found',data:userRes}).getResponse());
        
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
}