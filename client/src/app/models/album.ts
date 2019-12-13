export class Album{

    //AL crear el modelo De esta manera al instaciar la clase se crean los seter y getter automaticamente
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public image: string,
        public artist: string
    ){};

    
}