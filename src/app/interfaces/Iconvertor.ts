export interface IConvertor {

    jsonToCSVConvertor(jsonData: any, showLabel: boolean): string;

    csvToJsonConvertor(csvFile: string): string

    csvToArray(strData: string, strDelimiter: string): any[][]
}