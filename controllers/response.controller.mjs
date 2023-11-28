
export default class Response{

    status = '';
    message = '';
    data='';

    constructor({status=200,message='',data=[]}){
        this.status=status;
        this.message=message;
        this.data=data;
    }

    getResponse(){
        return this
    }


}