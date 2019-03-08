import { BaseImdbModel } from './../models/baseImdbModel';
import { IConvertor } from '../interfaces/IConvertor';

export class ConvertorUtils implements IConvertor {

    constructor() { }

    JSONToCSVConvertor(jsonData: Array<BaseImdbModel>, showLabel: boolean) {

        let arrData: any = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
        let CSV: string = '';

        if (showLabel) {
            let row: string = "";
            for (let index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }

        for (let i = 0; i < arrData.length; i++) {
            let row: string = "";
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        return CSV;
    }

    CSVToJsonConvertor(csvFile: string) {
        let array = this.CSVToArray(csvFile, ",");
        let objArray = [];
        for (let i = 1; i < array.length - 1; i++) {
            objArray[i - 1] = {};
            for (let k = 0; k < array[0].length && k < array[i].length; k++) {
                let key = array[0][k];
                objArray[i - 1][key] = array[i][k]
            }
        }
        let json: string = JSON.stringify(objArray);
        let str: string = json.replace(/},/g, "},\r\n");
        return str;
    }

    CSVToArray(strData: string, strDelimiter: string) {
        strDelimiter = (strDelimiter || ",");
        let objPattern: RegExp = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
        let arrData = [[]];
        let arrMatches = null;
        while (arrMatches = objPattern.exec(strData)) {
            let strMatchedDelimiter = arrMatches[1];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            if (arrMatches[2]) {
                var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"), "\"");
            } else {
                var strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return (arrData);
    }
}