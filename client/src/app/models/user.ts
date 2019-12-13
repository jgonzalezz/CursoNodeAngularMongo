export class User{

    //AL crear el modelo De esta manera al instaciar la clase se crean los seter y getter automaticamente
    constructor(
        public _id: string ,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ){};

    
}