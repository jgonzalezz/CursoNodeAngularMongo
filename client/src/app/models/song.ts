export class Song{

    //AL crear el modelo De esta manera al instaciar la clase se crean los seter y getter automaticamente
    constructor(
        public number: string ,
        public name: string,
        public duration: string,
        public file: string,
        public album: string
    ){};

    
}