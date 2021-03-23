export class Validator {
    static isFileAJson(file) :boolean {
        return file.type == "application/json";
    }
}

export class U {
    static redirect(location: string) :void {
        window.location.href = "#" + location;
    }

    static getRandomInt(min: number, max:number) :number {
        min = Math.ceil(min);
        max = Math.floor(max);

        //Min is inclusive, max is exlusive
        return Math.floor(Math.random() * (max - min) + min);
    }
}