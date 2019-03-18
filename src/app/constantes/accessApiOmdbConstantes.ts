export class AccessApiOmdbConstantes {

    private static accessApiOmdbConstantes: AccessApiOmdbConstantes;
    private readonly apiKey: string = "75522b56";

    private constructor() { }

    static getInstance(): AccessApiOmdbConstantes {
        if (this.accessApiOmdbConstantes == null) {
            this.accessApiOmdbConstantes = new AccessApiOmdbConstantes();
        }
        return this.accessApiOmdbConstantes;
    }

    get ApiKeyValue(): string {
        return this.apiKey;
    }
}