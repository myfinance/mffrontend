export class TypeConverter {
    //toIsoString converts the Date to UTC Time. ForDate without Time (hour=0) does this mean day-1 what is not the intention. So add the TimeZoneOffset before
    public static parseGermanDate(dateString: string): Date {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed
    }

    public static parseGermanNumber(value: string): number | null {
        const parts = new Intl.NumberFormat('de-DE').formatToParts(12345.6);
        const groupSeparator = parts.find(part => part.type === 'group')?.value || '.';
        const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || ',';

        // Replace group separators with empty string and decimal separators with a dot
        const normalizedValue = value.replace(new RegExp(`\\${groupSeparator}`, 'g'), '').replace(decimalSeparator, '.');

        const number = parseFloat(normalizedValue);

        return isNaN(number) ? null : number;
    }
}

