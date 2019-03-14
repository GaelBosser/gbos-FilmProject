export class DefaultValueApiConstantes{
    
    private static defaultValueApiConstantes: DefaultValueApiConstantes;
    private readonly defaultFieldUndefined: string = "N/A";

    private constructor() { }

    static getInstance(): DefaultValueApiConstantes {
        if (this.defaultValueApiConstantes == null) {
            this.defaultValueApiConstantes = new DefaultValueApiConstantes();
        }
        return this.defaultValueApiConstantes;
    }

    get defaultFieldUndefinedValue():string{
        return this.defaultFieldUndefined;
    }
}