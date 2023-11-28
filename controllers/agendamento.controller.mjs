import { db } from "../services/database.mjs"
import Response from "./response.controller.mjs"
export default class AgendamentoController{

    data='';

    static async getAll(){
        const resEsp = await db.searchAll('agendamento');
        console.log(resEsp)
        return resEsp
    }
    static async create(data){
        const resEsp = await db.insertUser('agendamento',data);
        console.log(resEsp)
        return resEsp
    }
    static async get(id){
        const resEsp = await db.findById('agendamento',id);
        console.log(resEsp)
        return resEsp
    }
    static async delete(id){
        const resEsp = await db.deleteDocument('agendamento',id);
        console.log(resEsp)
        return resEsp
    }
    static async update(id,data){
        const resEsp = await db.updateDocument('agendamento',id,data);
        console.log(resEsp)
        return resEsp
    }
    static async getUserEvents(id){
        const resEsp = await db.findAgendamentosByUserId(id);
        console.log(resEsp)
        return resEsp
    }
    static async getMedicEvents(id){
        const resEsp = await db.findAgendamentosByMedicId(id);
        console.log(resEsp)
        return resEsp
    }
    
}