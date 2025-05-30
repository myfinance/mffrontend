export type CSVTypeEnum = 'COBA' | 'C24' | 'MIN';
export const CSVTypeEnum = {
  COBA: 'COBA' as CSVTypeEnum,
  C24: 'C24' as CSVTypeEnum,
  MIN: 'MIN' as CSVTypeEnum
};

export class CsvImporter {
    //toIsoString converts the Date to UTC Time. ForDate without Time (hour=0) does this mean day-1 what is not the intention. So add the TimeZoneOffset before
    public static loadFile(file: File, csvType:CSVTypeEnum, callback: (rows: any[][]) => void){
        //array varibales to store csv data
        const lines = []; //for headings
        //File reader method
        const reader: FileReader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = (e) => {
            const csv: string = reader.result as string;
            const allTextLines = csv.split("\n");
    
            //Table Headings
            const headers = allTextLines[0].split(';');
            const data = headers;
            const tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }
            //Pusd headings to array variable
            lines.push(tarr);
    
            const arrl = allTextLines.length;
            const rows = [];
            for (let i = 1; i < arrl; i++) {
              const row = allTextLines[i].split(';');
              if (row != null && row[0]!=null && row[0]!="") {
                //rownumber, transactiondate, description, value
                let minrow = [i.toString(), row[2].toString(), row[0].toString(), row[1].toString()];
                if(csvType==CSVTypeEnum.COBA){
                  minrow = [i.toString(), row[0].toString(), row[3].toString(), row[4].toString()];
                }
                rows.push(minrow);
              }
            }
            callback(rows);
          }
        }
    }
  }