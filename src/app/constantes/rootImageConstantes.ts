export class RootImageConstantes {

    private static imagesConstantes: RootImageConstantes;
    private readonly defaultImage: string = "assets/imagePoster/noposteravailable.jpg";
    private readonly acteurDefaultImage: string = "assets/imageActor/acteur.png";
    private readonly awardDefaultImage: string = "assets/imageAward/awards.png";
    private readonly websiteDefaultImage: string = "assets/imageWebsite/website.jpg";

    private constructor() { }

    static getInstance(): RootImageConstantes {
        if (this.imagesConstantes == null) {
            this.imagesConstantes = new RootImageConstantes();
        }
        return this.imagesConstantes;
    }

    get rootDefaultImage():string{
        return this.defaultImage;
    }

    get rootActeurDefaultImage():string{
        return this.acteurDefaultImage;
    }

    get rootAwardDefaultImage():string{
        return this.awardDefaultImage;
    }

    get rootWebsiteDefaultImage():string{
        return this.websiteDefaultImage;
    }
}