export class Artist{

    //AL crear el modelo De esta manera al instaciar la clase se crean los seter y getter automaticamente
    constructor(
        public name: string,
        public description: string,
        public image: string
    ){};

    
}