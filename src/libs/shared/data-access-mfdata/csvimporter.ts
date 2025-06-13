import { TypeConverter } from "./typeConverter";

export type CSVTypeEnum = 'COBA' | 'C24' | 'MIN';
export const CSVTypeEnum = {
  COBA: 'COBA' as CSVTypeEnum,
  C24: 'C24' as CSVTypeEnum,
  MIN: 'MIN' as CSVTypeEnum
};

export class CsvRow {
  constructor(public rowNumber: string, public transactionDate: Date, public description: string, public value: number, public ignore: boolean, public categorie: string, public subcategorie: string) {}
}

export class CsvImporter {
    //toIsoString converts the Date to UTC Time. ForDate without Time (hour=0) does this mean day-1 what is not the intention. So add the TimeZoneOffset before
    public static loadFile(file: File, csvType:CSVTypeEnum, callback: (rows: CsvRow[]) => void){
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
            let splitCharacter = ',';
            if(csvType==CSVTypeEnum.COBA) {
              splitCharacter = ';';
            }
            const headers = allTextLines[0].split(splitCharacter);
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
              const row = allTextLines[i].split(splitCharacter);
              if (row != null && row[0]!=null && row[0]!="" && row[1]!=null && row[1]!="" && row[4]!=null && row[4]!="") {
                let minrow = new CsvRow(i.toString(), TypeConverter.parseGermanDate(row[0].toString()), row[3].toString(), TypeConverter.parseGermanNumber(row[4]) ?? 0, false,"","");
                if(csvType==CSVTypeEnum.COBA){
                  minrow = new CsvRow(
                    i.toString(), 
                    TypeConverter.parseGermanDate(row[0].toString()), 
                    row[3].toString(), 
                    TypeConverter.parseGermanNumber(row[4]) ?? 0,
                    false,
                    "",
                    ""
                  );
                } else if(csvType==CSVTypeEnum.C24){
                  minrow = new CsvRow(
                    i.toString(), 
                    TypeConverter.parseGermanDate(row[1].toString()), 
                    row[5].toString()+row[8].toString(), 
                    TypeConverter.parseGermanNumber(row[3]+","+row[4]) ?? 0,
                    false,
                    row[12].toString(),
                    row[13].toString().replace('\r','')
                  );
                }
                rows.push(minrow);
              }
            }
            callback(rows);
          }
        }
    }
  }