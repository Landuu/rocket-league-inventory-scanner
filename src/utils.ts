export class Validator {
    static isFileAJson(file) :boolean {
        return file.type == "application/json";
    }
}