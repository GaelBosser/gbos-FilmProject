import { IConvertor } from '../interfaces/IConvertor';

export class ConvertorUtils implements IConvertor {

    constructor(){}

    JSONToCSVConvertor(jsonData: any, showLabel: boolean) {

        let arrData: any = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
        let CSV: string = '';    
    
        if (showLabel) {
            let row: string = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
    
        for (var i = 0; i < arrData.length; i++) {
            let row: string = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
    
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }  
        return CSV;
    }
}